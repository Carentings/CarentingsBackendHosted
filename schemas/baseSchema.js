const baseSchema = {
  createdBy: {
    required: true,
    type: String,
  },
  updatedBy: {
    type: String,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  lastUpdationDate: {
    type: Date,
    default: Date.now,
  },
};

/**
 * Adds the base schema to the provided schema
 *
 * @param schemas Object
 * @returns Object
 */
function addBaseSchemaToSchema(schema) {
  return { ...schema, ...baseSchema };
}

module.exports = { baseSchema, addBaseSchemaToSchema };
