import { defineConfig } from 'vite';
import { resolve } from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    outDir: 'dist',
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
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
    }
  },
});
