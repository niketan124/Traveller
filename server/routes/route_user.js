import express from 'express'
const router = express.Router();
import { signUp, signIn, googleSignIn } from '../controllers/controller_user.js';

router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.post('/googleSignIn', googleSignIn)

export default router;