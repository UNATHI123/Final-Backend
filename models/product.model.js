const mongoose = require("mongoose");
const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    title: {
        type :String,
        required:true
    },
    image:{ 
        type :String,
        required:true
    },
    category: {
         type :String,
         required:true
    },

    price : {
    type :Number,
    required:true
},
    description : {
    type :String,
    required:true
},


     cart:{
        type:Array,
        default:[]
     },

    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);
module.exports = Product;
