const locationModel = require("../schemas/locationSchema");
const categoryModel = require("../schemas/categorySchema");
const productModel = require();
const bookingModel = require();
const supplierModel = require();
const inventoryModel = require();
const {
  getAsync: mongoGetAsync,
  insertAsync: mongoInsertAsync,
  updateAsync: mongoUpdateAsync,
  deleteByIdAsync: mongoDeleteAsync,
  lookUpAsync: mongoLookUpAsync,
} = require("../helpers/mongoDBHelper");
const { ObjectId } = require('mongoose');



/*product -> supplier, category, booking
booking -> product, supplier
supplier -> product, location*/







let userSchema = {
    id:{
        required:true,
        type:String
    },
    firstName:{
        required:true,
       type:String

    },
    lastName:{
        required:true,
       type:String

    },
    email:{
        required:true,
       type:String

    },
    number:{
        required:true,
       type:Number

    },
    locationId:{
        required:true,
       type:Number

    },
}
let invoiceSchema={
    id:{
        required:true,
        type:required,
    },
    bookingId:{
        required:true,
        type:required,
    },
    supplierId:{
        required:true,
        type:required,
    }
    
}