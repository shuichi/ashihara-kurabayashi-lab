import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { site, base } from "./config/site.mjs";

export default defineConfig({
  site,
  base,
  output: "static",
  trailingSlash: "always",
  build: { format: "directory" },
  integrations: [react()],
  devToolbar: { enabled: false },
  vite: { server: { watch: { useFsEvents: false, usePolling: true } } },
});
