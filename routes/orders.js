import express from 'express'
import OrderController from '../controllers/OrderController.js'
const router = express.Router();
import { auth } from '../middleware/auth.js'

router.post('/' , OrderController.create);
router.get('/', OrderController.getAllOrders);
router.get('/:id', OrderController.getOneOrder);
router.put('/update/:id', OrderController.update);
router.delete('/delete/:id', OrderController.delete);

export default router;
