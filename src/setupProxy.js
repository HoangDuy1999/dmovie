const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/secure/news", {
      target: "https://tmovie.org",
      changeOrigin: true,
    }),
    // createProxyMiddleware("/secure/people", {
    //   target: "https://tmovie.org",
    //   changeOrigin: true,
    // })
  );
  app.use(
    createProxyMiddleware("/secure/people", {
      target: "https://tmovie.org",
      changeOrigin: true,
    })
  );
};
