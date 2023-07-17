const { Router } = require("express");
const {
  getAsync,
  insertAsync,
  updateAsync,
  deleteAsync,
  lookUpAsync,
} = require("../services/locationService");

const locationRouter = Router();

locationRouter.get("/get", async (req, res) => {
  let response = await getAsync(req.query);
  res.status(response.getStatusCode()).json(response.getData());
});

locationRouter.get("/lookUp", async (req, res) => {
  const keyword = req.query.keyword;
  let response = await lookUpAsync(keyword);
  res.status(response.getStatusCode()).json(response.getData());
});

locationRouter.post("/insert", async (req, res) => {
  let response = await insertAsync(req.body);
  res.status(response.getStatusCode()).json(response.getData());
});

locationRouter.put("/update", async (req, res) => {
  let response = await updateAsync(req.body);
  res.status(response.getStatusCode()).json(response.getData());
});

locationRouter.delete("/delete/:id", async (req, res) => {
  let response = await deleteAsync(req.params.id);
  res.status(response.getStatusCode()).json(response.getData());
});

module.exports = locationRouter;
