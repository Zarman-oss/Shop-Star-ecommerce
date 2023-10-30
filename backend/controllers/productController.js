import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';


// @desc Fetch All product
// @route Get/Api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({});
    res.json(products);

});


// @desc Fetch a product
// @route GET/api/products/:id
//@access Public 

const getProductById = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (product) {
        return res.json(product);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }

});

// @desc create a product
// @route POST /api/products
// @access Private/Admin 
const createProduct = asyncHandler(async (req, res) => {

    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/Patriots logo.webp',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    })


    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

export { getProducts, getProductById, createProduct };