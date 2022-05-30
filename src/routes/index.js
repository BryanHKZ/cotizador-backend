const userRouter = require("./userRoutes");
const shopRouter = require("./shopRouter");
const productRouter = require("./productRouter");

const registerRoutes = (app) => {
  app.use("/api", userRouter);
  app.use("/api/shop", shopRouter);
  app.use("/api/product", productRouter);
};

module.exports = registerRoutes;
