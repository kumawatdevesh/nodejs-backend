import express from 'express'
import tokenMiddleware from '../middlewares/token'
import { updateUser, login, signUp } from '../controllers/user'
import { signUpValidation, loginValidation } from '../validation/user'

const router = express.Router()

router.post('/login', loginValidation, login)

router.post('/signup', signUpValidation, signUp)

// router.use(tokenMiddleware)

router.put('/users/:id', updateUser)

export default router