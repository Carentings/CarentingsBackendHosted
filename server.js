require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const mongoConnStr = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;
const { addRoutesToApp } = require("./routes/index");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

app.use(express.json());


const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Carentings API",
    version: "1.0.0",
    description: "This is a REST API application made with Express.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "JSONPlaceholder",
      url: "https://jsonplaceholder.typicode.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
};

//routes
addRoutesToApp(app);

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.js"],
};
app.listen(port, () => {
  console.log(`Server Started at localhost:${port}`);
});

mongoose.connect(mongoConnStr);

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", async () => {
  console.log("Database Connected.");
});

const swaggerSpec = swaggerJSDoc(options);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
