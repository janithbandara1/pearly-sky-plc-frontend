// Each deployment (fr/gb/lk/global) is its own standalone build of this
// same codebase — its own domain, its own NEXT_PUBLIC_COUNTRY build, its
// own backend (see .env's comment on NEXT_PUBLIC_COUNTRY) — running as a
// separate git clone in its own folder on the VPS. This file is
// intentionally identical across every clone: it picks this deployment's
// PM2 process name and port from the clone folder's own name (see PORTS
// below) instead of a hardcoded value, so it needs no per-deployment
// editing and stays safely git-tracked — `git pull` never conflicts with
// it. Only touch this file to add a new deployment's folder name to PORTS.
const path = require('path');

// frontend-fr uses 3040, not 3000 — 3000/3001 are already taken by two
// other applications already running on this VPS.
const PORTS = {
  'frontend-fr': 3040,
  'frontend-gb': 3010,
  'frontend-lk': 3020,
  'frontend-global': 3030,
};

const appName = path.basename(__dirname);
const port = PORTS[appName];
if (!port) {
  throw new Error(
    `ecosystem.config.js: no port configured for folder "${appName}" — ` +
      `rename the folder to match one of [${Object.keys(PORTS).join(', ')}], or add a new entry to PORTS above.`,
  );
}

module.exports = {
  apps: [
    {
      name: appName,
      script: 'node_modules/next/dist/bin/next',
      args: `start -p ${port}`,
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
