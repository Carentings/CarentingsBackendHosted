const { executeAggregationQueryAsync } = require("../helpers/mongoDBHelper");
const { errorMessageHandling } = require("../helpers/commonHelper");
const { addBaseSchemaToSchema } = require("./baseSchema");
const { StatusCodes } = require("http-status-codes");
const Response = require("../models/response");
const Model = require("../schemas/modelSchema");
const { Schema, model } = require("mongoose");

let Models = {};

/**
 * Combines the given schema with inherited schemas, input object should have a property `schema` (Object) and `inheritedSchemas` (Array of Objects)
 * Adds the base schema to the combined schema if the parameter `addBaseSchema` is true
 *
 * @param {Object} schemas Must contain `schema` (Object) and `inheritedSchemas` (Array of Objects).
 * @param {boolean} addBaseSchema  default value: `false`.
 * @returns {Object}
 */
function parseSchema(responseData, addBaseSchema = false) {
  let schema = responseData.schema;
  for (const inherited of responseData.inheritedSchemas) {
    // Combine the schema objects into a single object
    Object.assign(schema, inherited.schema);
  }

  if (addBaseSchema) {
    schema = addBaseSchemaToSchema(schema);
  }

  return schema;
}

/**
 * Creates all the schema models present in the database and adds them to the Models Object in dynamicSchema.
 * Adds the base schema to all schemas
 * @returns {Response}
 */
async function createAllSchemasAsync() {
  let responseObj = new Response();
  try {
    const schemaQuery = [
      {
        $lookup: {
          from: "models",
          localField: "inherits",
          foreignField: "name",
          as: "inheritedSchemas",
        },
      },
    ];

    let response = new Response();
    await executeAggregationQueryAsync(Model, schemaQuery, response);

    if (response.getStatusCode() == StatusCodes.OK) {
      const responseData = response.getData();
      let names = [];
      for (const modelData of responseData) {
        let schema = parseSchema(modelData, true);
        const schemaData = model(modelData.name, new Schema(schema));
        Models[modelData.name] = schemaData;
        names.push(modelData.name);
      }
      responseObj.setResponse({
        statusCode: StatusCodes.OK,
        data: `Models added to schemas: ${names}`,
      });
    } else {
      responseObj = response;
    }
  } catch (error) {
    errorMessageHandling(responseObj, error);
  }
  return responseObj;
}

module.exports = { createAllSchemasAsync, Models };
