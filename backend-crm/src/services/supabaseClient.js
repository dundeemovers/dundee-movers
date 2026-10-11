/**
 * Supabase Connection & Hybrid Data Store Adapter.
 * Connects to Supabase when environment variables are supplied,
 * with zero-config local in-memory fallback.
 * Works seamlessly in both Node.js server and Cloudflare Edge Workers.
 */

let runtimeConfig = {
  supabaseUrl: '',
  supabaseKey: ''
};

export function setSupabaseCredentials(url, key) {
  if (url) runtimeConfig.supabaseUrl = url;
  if (key) runtimeConfig.supabaseKey = key;
}

function getCredentials() {
  const envUrl = (typeof process !== 'undefined' && process.env?.SUPABASE_URL) || runtimeConfig.supabaseUrl || '';
  const envKey = (typeof process !== 'undefined' && process.env?.SUPABASE_ANON_KEY) || runtimeConfig.supabaseKey || '';
  return { url: envUrl, key: envKey };
}

export function isSupabaseConfigured() {
  const { url, key } = getCredentials();
  return Boolean(url && key);
}

export function getSupabaseConfig() {
  const configured = isSupabaseConfigured();
  const { url } = getCredentials();
  return {
    isConfigured: configured,
    url: url ? url : 'Not connected (Using Local Store)',
    mode: configured ? 'supabase_cloud' : 'local_in_memory'
  };
}

/**
 * Execute Supabase REST Query if configured, otherwise fallback to local handler
 */
export async function executeSupabaseQuery(table, options = {}) {
  if (!isSupabaseConfigured()) {
    return null; // Will trigger local fallback in callers
  }

  const { url: supabaseUrl, key: anonKey } = getCredentials();

  try {
    const endpoint = `${supabaseUrl}/rest/v1/${table}`;
    const headers = {
      'apikey': anonKey,
      'Authorization': `Bearer ${anonKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    };

    const response = await fetch(endpoint, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined
    });

    if (!response.ok) {
      console.warn(`[Supabase REST] Error ${response.status} on ${table}`);
      return null;
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  } catch (err) {
    console.warn(`[Supabase REST] Network error connecting to Supabase:`, err.message);
    return null;
  }
}

/**
 * Lightweight keep-alive probe to prevent Supabase dormancy/pausing on Free Tier.
 * Queries PostgREST (PostgreSQL compute) so Supabase registers active usage
 * and resets its 7-day automatic inactivity pause countdown.
 */
export async function pingSupabase() {
  const { url, key } = getCredentials();
  if (!url || !key) {
    return { success: false, reason: 'Supabase credentials not configured', timestamp: new Date().toISOString() };
  }

  try {
    // Primary probe: Query database via PostgREST to register compute usage
    const dbEndpoint = `${url}/rest/v1/leads_quotes?select=id&limit=1`;
    const response = await fetch(dbEndpoint, {
      method: 'GET',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      }
    });

    if (response.ok) {
      return {
        success: true,
        status: response.status,
        statusText: response.statusText,
        service: 'postgrest_database',
        timestamp: new Date().toISOString()
      };
    }

    // Secondary fallback: Auth health gateway
    const authEndpoint = `${url}/auth/v1/health`;
    const authResponse = await fetch(authEndpoint, {
      method: 'GET',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      }
    });

    return {
      success: authResponse.ok,
      status: authResponse.status,
      statusText: authResponse.statusText,
      service: 'auth_gateway',
      dbStatus: response.status,
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
      timestamp: new Date().toISOString()
    };
  }
}


