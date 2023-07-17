class Response {
  statusCode;
  data;

  setResponse({ statusCode, data }) {
    this.statusCode = statusCode;
    this.data = data;
  }

  setResponseByModel(responseObj) {
    this.data = responseObj.getData();
    this.statusCode = responseObj.getStatusCode();
  }

  getStatusCode() {
    return this.statusCode;
  }

  getData() {
    return this.data;
  }
}

module.exports = Response;
