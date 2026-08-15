import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "static-export",
  base: "./",
  publicDir: "../public",
  plugins: [
    {
      name:"cloudbase-relative-public-assets",
      enforce:"pre",
      transform(code,id){
        if(!id.includes("/app/")) return null;
        return code
          .replaceAll('"/festivals/','"./festivals/')
          .replaceAll('"/amitabha-companion.jpg"','"./amitabha-companion.jpg"')
          .replaceAll('"/summer-mountain.jpg"','"./summer-mountain.jpg"')
          .replaceAll('"/moon-mountain.jpg"','"./moon-mountain.jpg"')
          .replaceAll('"/guanyin-memorial.jpg"','"./guanyin-memorial.jpg"');
      },
    },
    react(),
  ],
  build: {
    outDir: "../tencent-static",
    emptyOutDir: true,
    rollupOptions: {input: "static-export/index.html"},
  },
});
