const { Router } = require("express");
const {
  getAsync,
  insertAsync,
  updateAsync,
  deleteAsync,
  lookUpAsync,
} = require("../services/categoryService");

const categoryRouter = Router();

/**
 * @swagger
 * /model/{id}:
 *   get:
 *     summary: Retrieve a single JSONPlaceholder user.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
 */
categoryRouter.get("/get", async (req, res) => {
  let response = await getAsync(req.query);
  res.status(response.getStatusCode()).json(response.getData());
});

categoryRouter.get("/lookUp", async (req, res) => {
  const keyword = req.query.keyword;
  let response = await lookUpAsync(keyword);
  res.status(response.getStatusCode()).json(response.getData());
});

categoryRouter.post("/insert", async (req, res) => {
  let response = await insertAsync(req.body);
  res.status(response.getStatusCode()).json(response.getData());
});

categoryRouter.put("/update", async (req, res) => {
  let response = await updateAsync(req.body);
  res.status(response.getStatusCode()).json(response.getData());
});

categoryRouter.delete("/delete/:id", async (req, res) => {
  let response = await deleteAsync(req.params.id);
  res.status(response.getStatusCode()).json(response.getData());
});

module.exports = categoryRouter;
