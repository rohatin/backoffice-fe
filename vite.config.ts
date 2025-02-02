import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import devServer from '@hono/vite-dev-server'
import { config } from 'dotenv'
config()

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
      react(), 
      TanStackRouterVite(),
      devServer({
        entry: './src/api/[[...route]].ts',
        exclude: [/^(?!\/api\/).*/], // Exclude all paths that don't start with /api/
        env: {
          AUTH_SECRET: process.env.AUTH_SECRET,
          CLIENT_API_KEY: process.env.CLIENT_API_KEY,
          AUTH_URL: process.env.AUTH_URL
        }
      })
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    }
});
