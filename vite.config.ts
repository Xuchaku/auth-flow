import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
   base: '/app',
   plugins: [react(), tailwindcss()],
   resolve: {
      alias: [
         { find: '@app', replacement: '/src/app' },
         { find: '@pages', replacement: '/src/pages' },
         { find: '@features', replacement: '/src/features' },
         { find: '@entities', replacement: '/src/entities' },
         { find: '@shared', replacement: '/src/shared' },
      ],
   },
   server: {
      port: 8080,
   },
});
