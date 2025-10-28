import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
    server: {
        port: 5173,
        strictPort: true,
        hmr: {
            clientPort: 5173
        },
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            },
        },
    },
  plugins: [react(), tailwindcss(), flowbiteReact()],
})