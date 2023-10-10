import express from 'express';
const router = express.Router();
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
} from '../controllers/OrderController.js';
import { protect, admin } from '../middleware/authMiddle.js'



router.route('/').post(protect, addOrderItems).get(protect, admin, getUsers);

router.post('/logout', logoutUser);

router.post('/auth', authUser);
// router.route('/auth').post(authUser);

router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router
    .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

export default router;