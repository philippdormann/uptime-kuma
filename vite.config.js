import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

const postCssScss = require("postcss-scss");

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000,
    },
    define: {
        "FRONTEND_VERSION": JSON.stringify(process.env.npm_package_version),
    },
    plugins: [
        vue()
    ],
    css: {
        postcss: {
            "parser": postCssScss,
            "map": false,
        }
    }
});
