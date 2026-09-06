/**
 * Authentication Route Handler for Dundee Movers CRM
 */
import {
  verifyPassword,
  generateSessionToken,
  validateSessionToken,
  extractBearerToken
} from '../services/authService.js';

export async function handleAuthRoute(req, res, pathname, query, body) {
  // POST /api/auth/login
  if (req.method === 'POST' && pathname === '/api/auth/login') {
    try {
      const payload = typeof body === 'string' ? JSON.parse(body || '{}') : body;
      const { accessKey, role } = payload || {};

      if (!accessKey) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, error: 'Master passkey is required' }));
      }

      const isValid = verifyPassword(accessKey);
      if (!isValid) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, error: 'Incorrect master passkey. Access denied.' }));
      }

      const assignedRole = role || 'dispatch_coordinator';
      const token = await generateSessionToken(assignedRole);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        success: true,
        token,
        user: {
          role: assignedRole,
          title: 'Operations Dispatcher',
          portal: 'Dundee Operations Cockpit'
        }
      }, null, 2));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: 'Failed to process login: ' + err.message }));
    }
  }

  // POST /api/auth/verify
  if (req.method === 'POST' && pathname === '/api/auth/verify') {
    try {
      let token = extractBearerToken(req.headers?.authorization);
      if (!token) {
        const payload = typeof body === 'string' ? JSON.parse(body || '{}') : body;
        token = payload?.token;
      }

      if (!token) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ valid: false, error: 'No session token provided' }));
      }

      const validation = await validateSessionToken(token);
      if (!validation.valid) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ valid: false, error: validation.reason }));
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ valid: true, payload: validation.payload }));
    } catch (err) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ valid: false, error: 'Token verification failed' }));
    }
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify({ error: 'Auth endpoint not found' }));
}
