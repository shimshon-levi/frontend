// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // כל המסלולים של ה-BFF
      "/auth": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
      "/clients": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
      "/cases": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
      "/templates": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
      // אם יש עוד, הוסף כאן
    },
  },
});
