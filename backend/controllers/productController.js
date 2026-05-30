const Product = require("../models/Product");

//CREATE PRODUCT

const createProduct = async (req,res) => {
    try {
        const {
            name,
            description,
            price,
            image,
            category,
            brand,
            countInStock
        } = req.body;


        const product = await Product.create({
      vendor: req.user._id,
      name,
      description,
      price,
      image,
      category,
      brand,
      countInStock,
        });

        res.status(201).json(product);
    }catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};

const getProducts = async (req,res) => {
    try{
        const products = await Product.find()
        .populate("vendor", "name email");

        res.json(products);
    }catch(error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateProduct = async(req,res) => {
    try{
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({
                message: "Product not found",
            });
        }

        //checking ownership
        if (product.vendor.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message: "Not authorized to update this product",
            });
        }

        // Update fields
        product.name = req.body.name || product.name;
        product.description = req.body.description || product.description;
        product.price = req.body.price || product.price;
        product.image = req.body.image || product.image;
        product.category = req.body.category || product.category;
        product.brand = req.body.brand || product.brand;
        product.countInStock = req.body.countInStock || product.countInStock;



        const updatedProduct = await product.save();

        res.json(updatedProduct);
    }catch(error){
      res.status(500).json({
        message:error.message,
      })
    }
}

const deleteProduct =  async (req,res) =>{
    try {

        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({
                message: "Product not found",
            });
        }

        //ownership check

        if(product.vendor.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized to delete product",
            });
        }

        await product.deleteOne();

        res.json({
            message: "Product deleted successfully"
        });
    }catch(error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

const getVendorProducts = async (req,res) => {
     try{

        const products = await Product.find({
            vendor: req.user._id,
        });

        res.json(products);
     }catch(error){
        res.status(500).json({
            message: error.message,
        });
     }
};
module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getVendorProducts,
}