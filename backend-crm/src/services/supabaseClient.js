/**
 * Supabase Connection & Hybrid Data Store Adapter.
 * Connects to Supabase when environment variables are supplied,
 * with zero-config local in-memory fallback.
 */

export function isSupabaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);
}

export function getSupabaseConfig() {
  const configured = isSupabaseConfigured();
  const url = process.env.SUPABASE_URL || '';
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

  const supabaseUrl = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

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
