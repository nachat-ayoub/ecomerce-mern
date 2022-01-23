const admin = require("../config/firebaseAdminConfig");
// Models
const User = require("../models/User");
const Product = require("../models/Product");

module.exports.getall = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "something went wrong during getting products",
      err: err.message,
    });
  }
};

module.exports.getone = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(400).json({
        msg: "this product is not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "something went wrong during getting this product",
      err: err.message,
    });
  }
};

module.exports.add = async (req, res) => {
  try {
    const { title, price, image, categories } = req.body;
    if ((title || price || image) !== "") {
      const token = req.headers.authorisation.split(" ")[1];
      const decodedToken = await admin.auth().verifyIdToken(token);
      const user = await User.findOne({ uid: decodedToken.uid });
      const author = user._id;
      const product = await Product.create({
        title,
        price,
        image,
        categories,
        author,
      });
      user.products.push(product._id);
      await user.save();
      res.status(200).json({
        product: product,
        msg: "Product created successfully",
      });
    } else {
      res.status(400).json({
        msg: "All fields are required",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "something went wrong during getting products",
      err: err.message,
    });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json({
        msg: "product deleted successfully",
      });
    } else {
      res.status(400).json({
        msg: "this product is not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "something went wrong during getting products",
      err: err.message,
    });
  }
};

module.exports.update = async (req, res) => {
  try {
    const { title, price, image, categories } = req.body;
    if ((title || price || image) !== "") {
      const product = await Product.findById(req.params.id);
      if (product) {
        const updatedProduct = Product.findByIdAndUpdate(
          req.params.id,
          { title, price, image, categories },
          { new: true }
        );
        res.status(200).json({
          msg: "Product updated successfully!",
          product: updatedProduct,
        });
      } else {
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "something went wrong during getting products",
      err: err.message,
    });
  }
};
