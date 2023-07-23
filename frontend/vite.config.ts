import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA, VitePWAOptions} from "vite-plugin-pwa";

// https://vitejs.dev/config/

const pwaManifest: Partial<VitePWAOptions> = {
    registerType: "prompt",
    includeAssets: ["favicon.ico"],
    manifest: {
        name: "BUNQ Overview",
        description: "Eine übersicht über unser BUNQ Konto",
        start_url: "./",
        display: "standalone",
        scope: "/",
    }
}

export default defineConfig({
    base: "./",
    plugins: [react(), VitePWA(pwaManifest)],
    //plugins: [react()],
    build: {
        outDir: "../backend/src/main/resources/dist",
        emptyOutDir: true
    }
})
