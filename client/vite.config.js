import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 5001,
    proxy: {
      "/api": {
        target: "http://localhost:8800",
        changeOrigin: true,
      },
    },
  },
});
