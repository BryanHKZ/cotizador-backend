const userRouter = require("./user");

const registerRoutes = (app) => {
  app.use("/api", userRouter);
};

module.exports = registerRoutes;
