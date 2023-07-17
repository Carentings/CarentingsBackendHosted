

const { addBaseSchemaToSchema } = require("./baseSchema");
const {Schema,model} = require ("mongoose");

let productSchema = {
    name :{
        required :true,
        type : String
    }
}
productSchema = addBaseSchemaToSchema(productSchema);
const dataSchema = new Schema(productSchema);

module.exports = model("product", dataSchema);