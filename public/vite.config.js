import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/openai': 'http://localhost:5555',
    },
  },
  plugins: [react()],
});
