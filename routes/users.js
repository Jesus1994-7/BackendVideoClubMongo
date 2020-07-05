import express from 'express';
import UserController from '../controllers/UserController.js'
const router = express.Router();
import { auth } from '../middleware/auth.js'

router.get('/', UserController.getUsers)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/logout', auth, UserController.logout)

export default router;