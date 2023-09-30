import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';


// @desc Fetch All product
// @route Get/Api/products
// @acees Public

const getProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({});
    res.json(products);

});


// @desc Fetch a product
// @route GET/api/products/:id
//@acess Puclic 

const getProductById = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (product) {
        return res.json(product);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }

});

export { getProducts, getProductById };