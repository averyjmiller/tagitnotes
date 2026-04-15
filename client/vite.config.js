import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      port: Number(env.VITE_PORT) || 5173,
    },
    define: {
      __API_URL__: JSON.stringify(env.VITE_API_URL),
    },
  }
})
