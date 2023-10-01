import {ConfigEnv, defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA, VitePWAOptions} from "vite-plugin-pwa";
import {execSync} from 'child_process'

// https://vitejs.dev/config/

const pwaManifest: Partial<VitePWAOptions> = {
    registerType: "prompt",
    includeAssets: ["favicon.ico"],
    manifest: {
        name: "Wie gehts BUNQ?",
        short_name: "BUNQ",
        description: "Eine übersicht über unser BUNQ Konto",
        theme_color: "#1976d2",
        background_color: "#1976d2",
        start_url: "./",
        scope: "./",
        id: "./",
        display: "standalone",
        icons: [
            {
                src: "assets/icons/logo_square-72.png",
                sizes: "72x72",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: "assets/icons/logo_square-96.png",
                sizes: "96x96",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: "assets/icons/logo_square-120.png",
                sizes: "120x120",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: "assets/icons/logo_square-128.png",
                sizes: "128x128",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: "assets/icons/logo_square-144.png",
                sizes: "144x144",
                type: "image/png",
                purpose: "any"
            },
            {
                src: "assets/icons/logo_square-152.png",
                sizes: "152x152",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: "assets/icons/logo_square-180.png",
                sizes: "180x180",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: "assets/icons/logo_square-192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: "assets/icons/logo_square-384.png",
                sizes: "384x384",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: "assets/icons/logo_square-512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable"
            },
        ]
    }
}

export default () => {
    const appName = "Wie gehts BUNQ?"
    const gitLatestTag = execSync("git describe --tags --abbrev=0").toString().trimEnd()
    const gitCurrentBranch = execSync("git rev-parse --abbrev-ref HEAD").toString().trimEnd()
    const gitLastCommit = execSync("git rev-parse --short HEAD").toString().trimEnd()
    const gitBuildDateTime = execSync("git log -1 --format=%cd --date=format:\"%d.%m.%y - %H:%M\"").toString().trimEnd()
    const gitBuildDate = execSync("git log -1 --format=%cd --date=format:\"%d.%m.%y\"").toString().trimEnd()

    process.env.VITE_APP_NAME = appName
    process.env.VITE_APP_VERSION = gitLatestTag
    process.env.VITE_CURRENT_BRANCH = gitCurrentBranch
    process.env.VITE_LAST_COMMIT = gitLastCommit
    process.env.VITE_APP_BUILDDATE = gitBuildDate
    process.env.VITE_APP_BUILDDATETime = gitBuildDateTime

    return defineConfig({
        base: "./",
        plugins: [react(), VitePWA(pwaManifest)],
        build: {
            emptyOutDir: true
        },
        server: {
            watch: {
                usePolling: true,
            },
            host: true,
            strictPort: true,
            port: 5173,
        }
    })
}
