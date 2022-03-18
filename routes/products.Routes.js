const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const verifyToken = require("../middlewares/authJwt");
const getProduct = require("../middlewares/acquire");


// Getting all
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getProduct, (req, res) => {
  res.send(res.product);
});


// Creating one
router.post("/",  async (req, res) => {
  const product = await Product({
    title: req.body.title,
    image: req.body.image,
    category:req.body.category,
    price: req.body.price,
    description:req.body.description,
    created_by: req.userId,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Updating One
router.patch("/:id", getProduct, async (req, res) => {
  if (res.product.created_by != req.userId) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
  if (req.body.title != null) {
    res.product.title = req.body.title;
  }
  if (req.body.image!= null) {
    res.product.image = req.body.image;
  }

 if (req.body.category != null) {
   res.product.category = req.body.category;
 }
  if (req.body.price != null) {
    res.product.price = req.body.price;
  }
  if (req.body.description != null) {
    res.product.description = req.body.description;
  }
  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Deleting One
router.delete("/:id", getProduct, async (req, res) => {
  try {
    if (res.product.created_by != req.userId) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    await res.product.remove();
    res.json({ message: "Deleted product" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
