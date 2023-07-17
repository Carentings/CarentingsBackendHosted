const { Schema, model } = require("mongoose");
const { addBaseSchemaToSchema } = require("./baseSchema");

let supplierSchema = {
    id:{
        required:true,
        type:String,
        unique:true
    },
    name:{
        required:true,
       type:String

    },
    email:{
        required:true,
       type:String,
       unique:true

    },
    number:{
        required:true,
       type:Number,
       unique:true

    },
    locationId:{
        required:true,
       type:Number,
       unique:true

    },

    

}

supplierSchema = addBaseSchemaToSchema(supplierSchema);
const dataSchema = new Schema(supplierSchema);

module.exports = model("supplier", dataSchema);
