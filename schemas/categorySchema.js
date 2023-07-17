const { addBaseSchemaToSchema } = require("./baseSchema");
const {Schema,model} = require ("mongoose");
let categorySchema = {
    name :{
        required :true,
        type : String,
        unique : true
    }
    
}
categorySchema = addBaseSchemaToSchema(categorySchema);
const dataSchema = new Schema(categorySchema);

module.exports = model("category", dataSchema);