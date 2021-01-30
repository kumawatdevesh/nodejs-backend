import express from 'express'
import { verification, getLogs } from '../controllers/verification'
import { verificationValidation } from '../validation/verification'

const router = express.Router()

router.get('/logs', getLogs)

router.post('/verification/:id', verificationValidation, verification)

export default router