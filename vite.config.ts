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
                src: "assets/icons/logo-72.png",
                sizes: "72x72",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: "assets/icons/logo-96.png",
                sizes: "96x96",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: "assets/icons/logo-120.png",
                sizes: "120x120",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: "assets/icons/logo-128.png",
                sizes: "128x128",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: "assets/icons/logo-144.png",
                sizes: "144x144",
                type: "image/png",
                purpose: "any"
            },
            {
                src: "assets/icons/logo-152.png",
                sizes: "152x152",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: "assets/icons/logo-180.png",
                sizes: "180x180",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: "assets/icons/logo-192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: "assets/icons/logo-384.png",
                sizes: "384x384",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: "assets/icons/logo-512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable"
            },
        ]
    }
}

export default ({mode}: ConfigEnv) => {
    if (mode !== "release") {
        const appName = "Wie gehts BUNQ?"
        const gitLatestTag = execSync("git describe --tags --abbrev=0").toString().trimEnd()
        const gitCurrentBranch = execSync("git rev-parse --abbrev-ref HEAD").toString().trimEnd()
        const gitLastCommit = execSync("git rev-parse --short HEAD").toString().trimEnd()
        const gitBuildDateTime = execSync("git log -1 --format=%cd --date=format:\"%d.%m.%y - %H:%M\"").toString().trimEnd()

        process.env.VITE_APP_NAME = appName
        process.env.VITE_APP_VERSION = gitLatestTag
        process.env.VITE_CURRENT_BRANCH = gitCurrentBranch
        process.env.VITE_LAST_COMMIT = gitLastCommit
        process.env.VITE_APP_BUILD_DATETIME = gitBuildDateTime
    }

    if (mode === "development") {
        process.env.VITE_DEV_HOST_ADDRESS = execSync("ip -o route get to 8.8.8.8 | sed -n 's/.*src \\([0-9.]\\+\\).*/\\1/p'").toString().trimEnd()
    }

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
