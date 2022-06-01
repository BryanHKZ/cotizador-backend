const userRouter = require("./userRoutes");
const shopRouter = require("./shopRouter");
const productRouter = require("./productRouter");
const quotationRouter = require("./quotationRouter");
const extraRouter = require("./extraRouter");

const registerRoutes = (app) => {
  app.use("/api", userRouter);
  app.use("/api/shop", shopRouter);
  app.use("/api/product", productRouter);
  app.use("/api/quotation", quotationRouter);
  app.use("/api/extra", extraRouter);
};

module.exports = registerRoutes;
