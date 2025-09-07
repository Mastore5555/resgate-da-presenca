import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "resgate-da-presenca", // 👈 caminho do repositório
});
