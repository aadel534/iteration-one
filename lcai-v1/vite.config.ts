import { defineConfig } from 'vite';
import { resolve } from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tailwindcss from 'tailwindcss';
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  plugins: [reactRefresh()],
  build: {
    outDir: 'dist',
    emptyOutDir: false, // Prevent Vite from clearing the dist directory

    rollupOptions: {
      input: resolve(__dirname, 'src/client/main.tsx'), 
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    },
 
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
    }
  },
});
