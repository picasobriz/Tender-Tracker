import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Proxy /api to Flask so the browser never hits CORS in development.
export default defineConfig({ plugins: [react()], server: { proxy: { "/api": "http://localhost:5000" } } });
