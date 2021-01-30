import express from 'express'
import { verification } from '../controllers/verification'

const router = express.Router()

router.post('/verification/:id', verification)

export default router