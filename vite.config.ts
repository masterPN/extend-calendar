/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    coverage: {
      provider: "v8",
      exclude: ["*.config.js", ".eslintrc.cjs", "src/*.*"],
    },
  },
});
