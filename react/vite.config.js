import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // En desarrollo la SPA se sirve desde un subdirectorio
  // (http://localhost/lunaspa/react/dist), y ahi hacen falta rutas relativas.
  //
  // En produccion se sirve desde la raiz del dominio, y "./" rompe: al abrir
  // directamente una ruta de React Router como /blog/mi-articulo, el navegador
  // resuelve "./assets/app.js" contra /blog/ y pide /blog/assets/app.js, que
  // nginx no encuentra. La pagina se queda en blanco sin error en consola de
  // nginx, porque la peticion si existe: simplemente devuelve index.html.
  // En dev no se nota, porque el servidor de Vite ignora base y ya sirve sus
  // recursos con rutas absolutas.
  base: mode === "production" ? "/" : "./",
  server: {
    proxy: {
      // El frontend consume /lunaspa/backend/public/api. En dev se reenvia al
      // Apache local para no depender de CORS ni de una URL absoluta.
      "/lunaspa/backend": {
        target: "http://localhost",
        changeOrigin: true
      }
    }
  }
}));
