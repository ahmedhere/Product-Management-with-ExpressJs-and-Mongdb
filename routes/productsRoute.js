const express = require("express");
const mongoose = require("mongoose");
const Router = express.Router();
const Product = require("../config/mongoConfig");
mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => {
    console.log("Database Connected....");
  })
  .catch((err) => {
    console.log("Mongo connection error");
    console.log(err);
  });

Router.get("/", async (req, res) => {
  const products = await Product.find({});
  // console.log(products);
  res.render("products", { products });
});

Router.get("/new", (req, res) => {
  res.render("products/NewProduct");
});

Router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("products/DetailedView", { product });
});

Router.post("/", async (req, res) => {
  const { name, price, category } = req.body;
  const newProduct = {
    name,
    price,
    category,
  };
  const product = new Product(newProduct);
  await product.save();
  const products = await Product.find({});
  res.render("products", { products });
});

Router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

Router.get("/:id/edit", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("products/EditProduct", { product });
});

Router.patch("/:id", async (req, res) => {
  const { name, price, category } = req.body;
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name,
        price,
        category,
      },
    },
    { new: true, runValidators: true }
  );
  res.render("products/DetailedView", { product });
});
module.exports = Router;
