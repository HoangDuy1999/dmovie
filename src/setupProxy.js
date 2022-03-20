const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/secure/news", {
      target: "https://tmovie.org",
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware("/cms/app/media/previewInfo", {
      target: "https://ga-mobile-api.loklok.tv",
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware("/secure/people", {
      target: "https://tmovie.org",
      changeOrigin: true,
    })
  );
};
