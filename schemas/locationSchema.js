const { Schema, model } = require("mongoose");
const { addBaseSchemaToSchema } = require("./baseSchema");

let locationSchema = {
  zipCode: {
    required: true,
    type: String,
    unique: true,
  },
};

locationSchema = addBaseSchemaToSchema(locationSchema);
const dataSchema = new Schema(locationSchema);

module.exports = model("location", dataSchema);
