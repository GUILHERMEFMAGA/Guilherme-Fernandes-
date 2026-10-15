import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// No GitHub Pages o site fica em /<nome-do-repo>/
const base = process.env.GITHUB_PAGES === "true" ? "/Guilherme-Fernandes-/" : "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  server: { host: "0.0.0.0", port: 5173, allowedHosts: true },
  preview: { host: "0.0.0.0", port: 4173, allowedHosts: true },
});
