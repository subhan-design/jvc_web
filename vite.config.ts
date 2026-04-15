import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "canvg": path.resolve(__dirname, "node_modules/canvg/dist/index.js"),
    },
  },
  optimizeDeps: {
    include: ['html2pdf.js', 'jspdf', 'html2canvas', 'canvg'],
    esbuildOptions: {
      // Mark canvg as external if it causes issues
      // external: ['canvg'],
    },
  },
  build: {
    commonjsOptions: {
      include: [/html2pdf\.js/, /jspdf/, /html2canvas/, /canvg/, /node_modules/],
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
}));
