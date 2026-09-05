/**
 * Health & System Status Route Handler
 */
import { getSupabaseConfig } from '../services/supabaseClient.js';

export function handleHealthCheck(req, res) {
  const status = {
    status: 'online',
    service: 'Dundee Movers CRM Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    memoryUsageMB: Math.round(process.memoryUsage().rss / (1024 * 1024)),
    supabase: getSupabaseConfig()
  };

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(status, null, 2));
}
