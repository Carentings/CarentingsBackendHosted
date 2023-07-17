const categoryRouter = require("./categoryRoutes");
const locationRouter = require("./locationRoutes");

function addRoutesToApp(app) {
  app.use("/api/category", categoryRouter);
  app.use("/api/location", locationRouter);
}

module.exports = { addRoutesToApp };
