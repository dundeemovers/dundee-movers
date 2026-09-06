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
      'Content-Type': 'application/json'
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

    return await response.json();
  } catch (err) {
    console.warn(`[Supabase REST] Network error connecting to Supabase:`, err.message);
    return null;
  }
}
