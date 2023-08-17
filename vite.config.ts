import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import Pages from 'vite-plugin-pages';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      plugins: [['@swc/plugin-emotion', {}]],
    }),
    Pages({
      exclude: ['**/components/*.tsx', '**/*.ts'],
    }),
  ],
  resolve: {
    alias: {
      '@base': fileURLToPath(new URL('./src/components/base', import.meta.url)),
      '@copmonents': fileURLToPath(
        new URL('./src/components', import.meta.url),
      ),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
