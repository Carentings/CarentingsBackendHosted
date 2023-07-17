

const { addBaseSchemaToSchema } = require("./baseSchema");
const {Schema,model} = require ("mongoose");


let bookingSchema = {
    fromDate:{
        required:true,
        type:Date
    },
    toDate:{
        required:true,
        type:Date
    }
    ,
    productId:{
        required:true,
        type:String,
        unique:true
    },
    userId:{
        required:true,
        type:String,
        unique:true
        
    },
    return:{
        required:false,
        type:Date


    }

}

bookingSchema = addBaseSchemaToSchema(bookingSchema);
const dataSchema = new Schema(bookingSchema);

module.exports = model("booking", dataSchema);