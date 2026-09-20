// Each country (fr/gb/lk) is its own standalone deployment of this same
// codebase — its own domain, its own backend, its own database (see
// lib/countries/config.ts's CURRENT_COUNTRY and backend/.env's comment on
// DB_DATABASE). This file describes a single deployment; running more than
// one country from the same server means copying this app block per
// country with its own `name`/port and its own .env (NEXT_PUBLIC_COUNTRY,
// NEXT_PUBLIC_API_URL, NEXT_PUBLIC_SITE_URL) behind that country's vhost.
module.exports = {
  apps: [
    {
      name: 'pearly-sky-frontend',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
