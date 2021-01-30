import { body } from 'express-validator'

// check if all fields are available or not

export const signUpValidation = [
    body('firstName').trim().notEmpty().withMessage('Please enter your first name!'),
    body('lastName').trim().notEmpty().withMessage('Please enter your last name!'),
    body('email').trim().notEmpty().isEmail().withMessage('Please enter your email!'),
    body('password').trim().notEmpty().withMessage('Please enter your password!'),
    body('role').trim().notEmpty().withMessage('Please select your role!')
]

export const loginValidation = [
    body('email').trim().notEmpty().isEmail().withMessage('Please enter your email!'),
    body('password').trim().notEmpty().withMessage('Please enter your password!')
]