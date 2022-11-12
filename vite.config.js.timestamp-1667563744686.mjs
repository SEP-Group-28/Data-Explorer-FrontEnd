// vite.config.js
import { defineConfig } from "file:///C:/Users/Thushalya/Desktop/My%20projects/Sem%205%20Project/Project/Data-Explorer-FrontEnd/node_modules/vite/dist/node/index.js";
import { VitePWA } from "file:///C:/Users/Thushalya/Desktop/My%20projects/Sem%205%20Project/Project/Data-Explorer-FrontEnd/node_modules/vite-plugin-pwa/dist/index.mjs";
import react from "file:///C:/Users/Thushalya/Desktop/My%20projects/Sem%205%20Project/Project/Data-Explorer-FrontEnd/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true
      },
      manifest: {
        "name": "Crypsto|X|plorer",
        "short_name": "Crypsto|X|plorer",
        "id": "/public/",
        "start_url": "./",
        "display": "standalone",
        "background_color": "#fafafa",
        "lang": "en",
        "scope": "./",
        "theme_color": "#1976d2",
        "icons": [
          {
            "src": "assets/icons/icon-72x72.png",
            "sizes": "72x72",
            "type": "image/png"
          },
          {
            "src": "assets/icons/icon-96x96.png",
            "sizes": "96x96",
            "type": "image/png"
          },
          {
            "src": "assets/icons/icon-128x128.png",
            "sizes": "128x128",
            "type": "image/png"
          },
          {
            "src": "assets/icons/icon-144x144.png",
            "sizes": "144x144",
            "type": "image/png"
          },
          {
            "src": "assets/icons/icon-152x152.png",
            "sizes": "152x152",
            "type": "image/png"
          },
          {
            "src": "assets/icons/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "assets/icons/icon-384x384.png",
            "sizes": "384x384",
            "type": "image/png"
          },
          {
            "src": "assets/icons/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ]
      }
    }),
    react(
      {
        babel: { parserOpts: { plugins: ["decorators-legacy"] } }
      }
    )
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxUaHVzaGFseWFcXFxcRGVza3RvcFxcXFxNeSBwcm9qZWN0c1xcXFxTZW0gNSBQcm9qZWN0XFxcXFByb2plY3RcXFxcRGF0YS1FeHBsb3Jlci1Gcm9udEVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcVGh1c2hhbHlhXFxcXERlc2t0b3BcXFxcTXkgcHJvamVjdHNcXFxcU2VtIDUgUHJvamVjdFxcXFxQcm9qZWN0XFxcXERhdGEtRXhwbG9yZXItRnJvbnRFbmRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL1RodXNoYWx5YS9EZXNrdG9wL015JTIwcHJvamVjdHMvU2VtJTIwNSUyMFByb2plY3QvUHJvamVjdC9EYXRhLUV4cGxvcmVyLUZyb250RW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICBWaXRlUFdBKHtcclxuICAgICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxyXG4gICAgICAgZGV2T3B0aW9uczoge1xyXG4gICAgICAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgfSxcclxuICAgICAgbWFuaWZlc3Q6e1xyXG4gICAgICAgIFwibmFtZVwiOiBcIkNyeXBzdG98WHxwbG9yZXJcIixcclxuICAgICAgICBcInNob3J0X25hbWVcIjogXCJDcnlwc3RvfFh8cGxvcmVyXCIsXHJcbiAgICAgICAgXCJpZFwiOiBcIi9wdWJsaWMvXCIsXHJcbiAgICAgICAgXCJzdGFydF91cmxcIjogXCIuL1wiLFxyXG4gICAgICAgIFwiZGlzcGxheVwiOiBcInN0YW5kYWxvbmVcIixcclxuICAgICAgICBcImJhY2tncm91bmRfY29sb3JcIjogXCIjZmFmYWZhXCIsXHJcbiAgICAgICAgXCJsYW5nXCI6IFwiZW5cIixcclxuICAgICAgICBcInNjb3BlXCI6IFwiLi9cIixcclxuICAgICAgICBcInRoZW1lX2NvbG9yXCI6IFwiIzE5NzZkMlwiLFxyXG4gICAgICAgIFwiaWNvbnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInNyY1wiOiBcImFzc2V0cy9pY29ucy9pY29uLTcyeDcyLnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzaXplc1wiOiBcIjcyeDcyXCIsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInNyY1wiOiBcImFzc2V0cy9pY29ucy9pY29uLTk2eDk2LnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzaXplc1wiOiBcIjk2eDk2XCIsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInNyY1wiOiBcImFzc2V0cy9pY29ucy9pY29uLTEyOHgxMjgucG5nXCIsXHJcbiAgICAgICAgICAgICAgICBcInNpemVzXCI6IFwiMTI4eDEyOFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJzcmNcIjogXCJhc3NldHMvaWNvbnMvaWNvbi0xNDR4MTQ0LnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzaXplc1wiOiBcIjE0NHgxNDRcIixcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwic3JjXCI6IFwiYXNzZXRzL2ljb25zL2ljb24tMTUyeDE1Mi5wbmdcIixcclxuICAgICAgICAgICAgICAgIFwic2l6ZXNcIjogXCIxNTJ4MTUyXCIsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInNyY1wiOiBcImFzc2V0cy9pY29ucy9pY29uLTE5MngxOTIucG5nXCIsXHJcbiAgICAgICAgICAgICAgICBcInNpemVzXCI6IFwiMTkyeDE5MlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJzcmNcIjogXCJhc3NldHMvaWNvbnMvaWNvbi0zODR4Mzg0LnBuZ1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzaXplc1wiOiBcIjM4NHgzODRcIixcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwic3JjXCI6IFwiYXNzZXRzL2ljb25zL2ljb24tNTEyeDUxMi5wbmdcIixcclxuICAgICAgICAgICAgICAgIFwic2l6ZXNcIjogXCI1MTJ4NTEyXCIsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICAgICAgICAgIFwicHVycG9zZVwiOlwibWFza2FibGVcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG4gICAgfSksXHJcbiAgICByZWFjdChcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhYmVsOlxyXG4gICAgICAgICAgICB7cGFyc2VyT3B0czp7cGx1Z2luczpbXCJkZWNvcmF0b3JzLWxlZ2FjeVwiXSx9LH0sfSlcclxuICBdXHJcbn0pXHJcblxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWljLFNBQVMsb0JBQW9CO0FBQzlkLFNBQVMsZUFBZTtBQUN4QixPQUFPLFdBQVc7QUFHbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsUUFBUTtBQUFBLE1BQ0wsY0FBYztBQUFBLE1BQ2QsWUFBWTtBQUFBLFFBQ1gsU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUNBLFVBQVM7QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLE1BQU07QUFBQSxRQUNOLGFBQWE7QUFBQSxRQUNiLFdBQVc7QUFBQSxRQUNYLG9CQUFvQjtBQUFBLFFBQ3BCLFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQSxRQUNULGVBQWU7QUFBQSxRQUNmLFNBQVM7QUFBQSxVQUNMO0FBQUEsWUFDSSxPQUFPO0FBQUEsWUFDUCxTQUFTO0FBQUEsWUFDVCxRQUFRO0FBQUEsVUFDWjtBQUFBLFVBQ0E7QUFBQSxZQUNJLE9BQU87QUFBQSxZQUNQLFNBQVM7QUFBQSxZQUNULFFBQVE7QUFBQSxVQUNaO0FBQUEsVUFDQTtBQUFBLFlBQ0ksT0FBTztBQUFBLFlBQ1AsU0FBUztBQUFBLFlBQ1QsUUFBUTtBQUFBLFVBQ1o7QUFBQSxVQUNBO0FBQUEsWUFDSSxPQUFPO0FBQUEsWUFDUCxTQUFTO0FBQUEsWUFDVCxRQUFRO0FBQUEsVUFDWjtBQUFBLFVBQ0E7QUFBQSxZQUNJLE9BQU87QUFBQSxZQUNQLFNBQVM7QUFBQSxZQUNULFFBQVE7QUFBQSxVQUNaO0FBQUEsVUFDQTtBQUFBLFlBQ0ksT0FBTztBQUFBLFlBQ1AsU0FBUztBQUFBLFlBQ1QsUUFBUTtBQUFBLFVBQ1o7QUFBQSxVQUNBO0FBQUEsWUFDSSxPQUFPO0FBQUEsWUFDUCxTQUFTO0FBQUEsWUFDVCxRQUFRO0FBQUEsVUFDWjtBQUFBLFVBQ0E7QUFBQSxZQUNJLE9BQU87QUFBQSxZQUNQLFNBQVM7QUFBQSxZQUNULFFBQVE7QUFBQSxZQUNSLFdBQVU7QUFBQSxVQUNkO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFBQSxJQUNBLENBQUM7QUFBQSxJQUNEO0FBQUEsTUFDSTtBQUFBLFFBQ0ksT0FDQSxFQUFDLFlBQVcsRUFBQyxTQUFRLENBQUMsbUJBQW1CLEVBQUUsRUFBRTtBQUFBLE1BQUU7QUFBQSxJQUFDO0FBQUEsRUFDMUQ7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
