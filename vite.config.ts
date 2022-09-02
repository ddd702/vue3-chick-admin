/**
 * @type {import('vite').UserConfig}
 */
import { fileURLToPath, URL } from 'node:url';
import { createHtmlPlugin } from 'vite-plugin-html';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // console.warn('env', env);
  return {
    server: {
      host: '0.0.0.0',
      port: 8090,
    },
    // define: {
    //   name: env.VITE_APP_TITLE,
    // },
    plugins: [
      vue(),
      vueJsx(),
      createHtmlPlugin({
        minify: true,
        entry: 'src/main.ts',
        template: 'index.html',
        /**
         * 需要注入 index.html ejs 模版的数据
         */
        inject: {
          data: {
            title: `Chick Admin`,
            injectScript: `<script type="text/javascript">
              window.APP_MODE='${mode}';
              window.APP_API_HOST='${env.VITE_APP_API_HOST || ''}';
            </script>`,
          },
        },
      }),
      // visualizer(),
    ],
    css: {
      /* CSS 预处理器 */
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "@/styles/vars.scss";
          @import "@/styles/mixins.scss";
        `,
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      manifest: true,
      sourcemap: true,
    },
  };
});
