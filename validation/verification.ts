import { body } from 'express-validator'

// check if all fields are available or not

export const verificationValidation = [
    body('role').trim().notEmpty().withMessage('Please select your role!'),
]