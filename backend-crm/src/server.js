/**
 * Dundee Movers CRM Backend Server & Static SPA Host.
 * Clean, modular Node.js ES Modules HTTP API serving CRM endpoints and client dashboard.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { URL } from 'node:url';

import { handleHealthCheck } from './routes/health.js';
import { handleLeadsRoute } from './routes/leads.js';
import { handleJobsRoute } from './routes/jobs.js';
import { handleEmailsRoute } from './routes/emails.js';
import { handleAuthRoute } from './routes/auth.js';
import { validateSessionToken, extractBearerToken } from './services/authService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CLIENT_DIR = path.join(__dirname, 'client');

// Load environment variables from .env if present
try {
  process.loadEnvFile();
} catch (_) {
  try {
    process.loadEnvFile(path.join(__dirname, '..', '.env'));
  } catch (_) {}
}

const PORT = process.env.PORT || 5000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function serveStaticFile(req, res, pathname) {
  let relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');
  let filePath = path.join(CLIENT_DIR, relativePath);

  // If path doesn't exist or doesn't have an extension, serve index.html (SPA routing)
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(CLIENT_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    res.end(data);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('File not found');
  }
}

function isProtectedEndpoint(pathname, method) {
  if (!pathname.startsWith('/api/')) return false;
  if (pathname === '/api/health') return false;
  if (pathname.startsWith('/api/auth/')) return false;
  // Public website wizard quote submission
  if (pathname === '/api/leads' && method === 'POST') return false;
  // Customer viewing digital Move Pass
  if (pathname.match(/^\/api\/leads\/[^/]+$/) && method === 'GET') return false;
  // Customer accepting digital Move Pass
  if (pathname.match(/^\/api\/leads\/[^/]+\/accept$/) && method === 'POST') return false;
  // Email template previews
  if (pathname.startsWith('/api/emails/preview/')) return false;
  return true;
}

const server = http.createServer(async (req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;
  const searchParams = parsedUrl.searchParams;

  // Health API
  if (pathname === '/api/health') {
    return handleHealthCheck(req, res);
  }

  // Read JSON body for mutating requests
  let body = '';
  if (['POST', 'PATCH', 'PUT'].includes(req.method)) {
    try {
      const buffers = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      body = Buffer.concat(buffers).toString();
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Failed to read request body' }));
    }
  }

  // Authentication API
  if (pathname.startsWith('/api/auth/')) {
    return handleAuthRoute(req, res, pathname, searchParams, body);
  }

  // Guard protected operational routes
  if (isProtectedEndpoint(pathname, req.method)) {
    const bearer = extractBearerToken(req.headers['authorization']);
    const session = await validateSessionToken(bearer);
    if (!session.valid) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
        error: 'Unauthorized: Operations passkey required',
        reason: session.reason
      }));
    }
  }

  // REST API Routes
  if (pathname.startsWith('/api/leads')) {
    return handleLeadsRoute(req, res, pathname, searchParams, body);
  }
  if (pathname.startsWith('/api/jobs')) {
    return handleJobsRoute(req, res, pathname, searchParams, body);
  }
  if (pathname.startsWith('/api/emails')) {
    return handleEmailsRoute(req, res, pathname, searchParams, body);
  }

  // Serve CRM Client Dashboard SPA for all non-API paths
  serveStaticFile(req, res, pathname);
});

server.listen(PORT, () => {
  console.log(`[Dundee Movers CRM] Dashboard & API running at http://localhost:${PORT}`);
  console.log(`[Dundee Movers CRM] Front Desk: http://localhost:${PORT}/#front-desk`);
  console.log(`[Dundee Movers CRM] Leads: http://localhost:${PORT}/#leads`);
});

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});
