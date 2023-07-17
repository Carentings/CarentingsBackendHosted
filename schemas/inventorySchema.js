const { Schema, model } = require("mongoose");
const { addBaseSchemaToSchema } = require("./baseSchema");
let inventorySchema = {
    price:{
        required:true,
       type:parseFloat(String) //not sure that how we pass please check

    },
    nextAvailableDate:{
        required:true,
       type:Date

    },
    id:{
        required:true,
       type:String,
       unique:true

    },
    productId:{
        required:true,
       type:String,
       unique:true
,

    },

}

supplierSchema = addBaseSchemaToSchema(supplierSchema);
const dataSchema = new Schema(supplierSchema);

module.exports = model("supplier", dataSchema);
