import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Required for client-side routing (e.g., react-router-dom)
    fs: {
      strict: false,
    },
  },
  build: {
    rollupOptions: {
      input: 'index.html',
    },
  },
});
