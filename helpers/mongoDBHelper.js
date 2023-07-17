const Response = require("../models/response");
const { StatusCodes } = require("http-status-codes");
const { errorMessageHandling } = require("./commonHelper");

async function getAsync(Model, parameters, responseObj) {
  try {
    const data = await Model.find(parameters);
    if (data != null && data.length > 0) {
      responseObj.setResponse({
        statusCode: StatusCodes.OK,
        data: data,
      });
    } else {
      responseObj.setResponse({ statusCode: StatusCodes.NO_CONTENT, data: [] });
    }
  } catch (error) {
    errorMessageHandling(responseObj, error);
  }
}

async function insertAsync(Model, payload, responseObj) {
  try {
    const dataToSave = new Model(payload);
    const savedData = await dataToSave.save();
    responseObj.setResponse({
      statusCode: StatusCodes.CREATED,
      data: savedData,
    });
  } catch (error) {
    errorMessageHandling(responseObj, error);
  }
}

async function updateAsync(Model, payload, responseObj) {
  try {
    const id = payload._id;
    payload["lastUpdationDate"] = Date.now();
    const updatedData = await Model.findByIdAndUpdate(id, payload, {
      new: true,
    });
    responseObj.setResponse({ statusCode: StatusCodes.OK, data: updatedData });
  } catch (error) {
    errorMessageHandling(responseObj, error);
  }
}

async function deleteByIdAsync(Model, id, responseObj) {
  try {
    await Model.findByIdAndDelete(id);
    responseObj.setResponse({ statusCode: StatusCodes.OK, data: true });
  } catch (error) {
    errorMessageHandling(responseObj, error);
  }
}

async function executeAggregationQueryAsync(Model, query, responseObj) {
  try {
    const result = await Model.aggregate(query);
    if (result.length > 0) {
      responseObj.setResponse({ statusCode: StatusCodes.OK, data: result });
    } else {
      responseObj.setResponse({
        statusCode: StatusCodes.NO_CONTENT,
        data: result,
      });
    }
  } catch (error) {
    errorMessageHandling(responseObj, error);
  }
}

async function lookUpAsync(Model, keyword, keyToSearch, responseObj) {
  let lookUpQuery = {};
  lookUpQuery[keyToSearch] = {
    $regex: new RegExp(`${keyword}|${keyword.split(" ").join("|")}`, "i"),
  };
  await getAsync(Model, lookUpQuery, responseObj);
  if (responseObj.getStatusCode() === StatusCodes.OK) {
    let lookUpResult = [];
    let result = responseObj.getData();
    for (i = 0; i < result.length; i++) {
      let tempObj = {};
      tempObj["label"] = result[i][keyToSearch];
      tempObj["value"] = result[i]._id;
      lookUpResult.push(tempObj);
    }
    responseObj.setResponse({ statusCode: StatusCodes.OK, data: lookUpResult });
  }
}

/**
 *
 * Gets and executes the given query from `queries` collection and executes the query by the model defined in the query document.
 * @param {Object} Models Object with all schema models with key -> model name and value -> model schema.
 * @param {string} queryName Query to retrieve and execute.
 * @param {Object} parameters body and query params to act as filter in aggregate query.
 * @returns {Response}
 */
async function getAggregateQueryByNameAndExecuteByModelAsync(
  Models,
  queryName,
  parameters,
  responseObj
) {
  try {
    const queryModel = Models["query"];
    const queryResult = await getAsync(queryModel, { name: queryName });
    if (queryResult.getStatusCode() == StatusCodes.OK) {
      const queryToExecuteResult = queryResult.getData();
      const querySchema = queryToExecuteResult[0].schema;
      const queryToExecute = queryToExecuteResult[0].query;

      //to be implemented - use params to filer query
      /*if (parameters != null && Object.keys(parameters).length > 0) {
        queryToExecute.push({ $match: parameters });
      }*/

      const result = await executeAggregationQueryAsync(
        Models[querySchema],
        queryToExecute
      );
      responseObj.setResponseByModel(result);
    } else {
      responseObj.setResponseByModel(queryResult);
    }
  } catch (error) {
    errorMessageHandling(responseObj, error);
  }
}

module.exports = {
  getAsync,
  insertAsync,
  updateAsync,
  deleteByIdAsync,
  executeAggregationQueryAsync,
  getAggregateQueryByNameAndExecuteByModelAsync,
  lookUpAsync,
};
