import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';


// @desc Create new order
// @route POST/api/orders
// @access Private

const addOrderItems = asyncHandler(async (req, res) => {

    res.send('add order items for now')

});


// @desc Get logged in user orders
// @route Get /api/order/myorders
// @access Private

const getMyOrders = asyncHandler(async (req, res) => {

    res.send('get my orders')

});


// @desc Get oder my ID
// @route Get /api/orders/:id
// @access Private

const getOrderById = asyncHandler(async (req, res) => {
    res.json('add order by Id');

});

// @desc Update order to paid
// @route POST /api/orders/:id/pay
// @access Private

const updateOrderToPaid = asyncHandler(async (req, res) => {

    res.send('update order to paid')

});


// @desc Update order to delivered
// @route POST /api/orders/:id/deliver
// @access Private/Admin

const updateOrderToDelivered = asyncHandler(async (req, res) => {

    res.send('update to delivered')

});


// @desc Gets all orders
// @route GET /api/orders
// @access Private/Admin

const getOrders = asyncHandler(async (req, res) => {

    res.send('get all orders')

});

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
};









