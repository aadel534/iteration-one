import { defineConfig } from "vite";
import { resolve } from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/client/main.tsx'),
        register: resolve(__dirname, 'src/client/Register/RegisterMain.tsx'),
      },
      
    },
  },
});
