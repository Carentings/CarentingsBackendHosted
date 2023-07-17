const Model = require("../schemas/locationSchema");
const {
  getAsync: mongoGetAsync,
  insertAsync: mongoInsertAsync,
  updateAsync: mongoUpdateAsync,
  deleteByIdAsync: mongoDeleteAsync,
  lookUpAsync: mongoLookUpAsync,
} = require("../helpers/mongoDBHelper");

const Response = require("../models/response");

async function getAsync(parameters) {
  return await mongoGetAsync(Model, parameters);
}

async function insertAsync(payload) {
  return await mongoInsertAsync(Model, payload);
}

async function updateAsync(payload) {
  return await mongoUpdateAsync(Model, payload);
}

async function deleteAsync(id) {
  return await mongoDeleteAsync(Model, id);
}

async function lookUpAsync(keyword) {
  let responseObj = new Response();
  await mongoLookUpAsync(Model, keyword, "zipCode", responseObj);
  return responseObj;
}

module.exports = {
  getAsync,
  insertAsync,
  updateAsync,
  deleteAsync,
  lookUpAsync,
};
