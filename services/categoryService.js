const Model = require("../schemas/categorySchema");
const {
  getAsync: mongoGetAsync,
  insertAsync: mongoInsertAsync,
  updateAsync: mongoUpdateAsync,
  deleteByIdAsync: mongoDeleteAsync,
  lookUpAsync: mongoLookUpAsync,
} = require("../helpers/mongoDBHelper");
const Response = require("../models/response");
const { StatusCodes } = require("http-status-codes");

async function getAsync(parameters) {
  let responseObj = new Response();
  await mongoGetAsync(Model, parameters, responseObj);
  return responseObj;
}

async function insertAsync(payload) {
  let responseObj = new Response();
  await mongoInsertAsync(Model, payload, responseObj);
  return responseObj;
}

async function updateAsync(payload) {
  let responseObj = new Response();
  await mongoUpdateAsync(Model, payload, responseObj);
  return responseObj;
}

async function deleteAsync(id) {
  let responseObj = new Response();
  await mongoDeleteAsync(Model, id, responseObj);
  return responseObj;
}

async function lookUpAsync(keyword) {
  let responseObj = new Response();
  await mongoLookUpAsync(Model, keyword, "productName", responseObj);
  return responseObj;
}

module.exports = {
  getAsync,
  insertAsync,
  updateAsync,
  deleteAsync,
  lookUpAsync,
};
