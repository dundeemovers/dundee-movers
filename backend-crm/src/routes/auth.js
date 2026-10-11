/**
 * Authentication Route Handler for Dundee Movers CRM.
 * Manages Supabase GoTrue Auth authentication, token verification, password recovery & password updates.
 */
import {
  signInWithSupabase,
  verifySupabaseToken,
  requestSupabasePasswordReset,
  updateSupabasePassword,
  signOutSupabase,
  verifyPassword,
  generateSessionToken,
  validateSessionToken,
  extractBearerToken
} from '../services/authService.js';

export async function handleAuthRoute(req, res, pathname, query, body) {
  const method = req.method;
  const payload = typeof body === 'string' ? JSON.parse(body || '{}') : (body || {});

  // 1. POST /api/auth/login
  if (method === 'POST' && pathname === '/api/auth/login') {
    try {
      const { email, password, accessKey, role } = payload;

      // Primary: Native Supabase Email + Password Login
      if (email && password) {
        const result = await signInWithSupabase(email, password);
        if (!result.success) {
          res.writeHead(result.status || 401, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify(result));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(result, null, 2));
      }

      // Fallback: Legacy Access Key Login (Emergency fallback)
      if (accessKey) {
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
            email: 'admin@dundeemovers.co.uk',
            role: assignedRole,
            title: 'Operations Dispatcher',
            portal: 'Dundee Operations Cockpit',
            isSuperAdmin: false
          }
        }, null, 2));
      }

      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: 'Email and password are required to sign in.' }));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: 'Failed to process login: ' + err.message }));
    }
  }

  // 2. POST /api/auth/verify
  if (method === 'POST' && pathname === '/api/auth/verify') {
    try {
      let token = extractBearerToken(req.headers?.authorization);
      if (!token) token = payload?.token;

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
      return res.end(JSON.stringify({ valid: true, user: validation.user || validation.payload }));
    } catch (err) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ valid: false, error: 'Token verification failed: ' + err.message }));
    }
  }

  // 3. POST /api/auth/forgot-password
  if (method === 'POST' && pathname === '/api/auth/forgot-password') {
    try {
      const { email, redirectTo } = payload;
      if (!email) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, error: 'Email address is required' }));
      }

      const result = await requestSupabasePasswordReset(email, redirectTo);
      res.writeHead(result.success ? 200 : 400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(result));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: err.message }));
    }
  }

  // 4. POST /api/auth/reset-password
  if (method === 'POST' && pathname === '/api/auth/reset-password') {
    try {
      const token = extractBearerToken(req.headers?.authorization) || payload.token;
      const { newPassword } = payload;

      if (!token) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, error: 'Recovery token is required' }));
      }

      const result = await updateSupabasePassword(token, newPassword);
      res.writeHead(result.success ? 200 : 400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(result));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, error: err.message }));
    }
  }

  // 5. POST /api/auth/logout
  if (method === 'POST' && pathname === '/api/auth/logout') {
    const token = extractBearerToken(req.headers?.authorization) || payload.token;
    await signOutSupabase(token);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ success: true, message: 'Logged out successfully' }));
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify({ error: 'Auth endpoint not found' }));
}
