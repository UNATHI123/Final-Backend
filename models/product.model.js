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
    type :String,
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

  })
);
module.exports = Product;
