const { StatusCodes } = require("http-status-codes");
const { addBaseSchemaToSchema } = require("../schemas/baseSchema");

function errorMessageHandling(responseObj, error) {
  responseObj.setResponse({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    data: { message: `Error occured: ${error.message}` },
  });
}

module.exports = { errorMessageHandling };
