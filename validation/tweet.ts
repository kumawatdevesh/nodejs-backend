import { body } from 'express-validator'

// check if all fields are available or not

export const tweetValidation = [
    body('title').trim().notEmpty().withMessage('Please enter tweet name!'),
    body('description').trim().notEmpty().withMessage('Please enter tweet description!'),
    body('role').trim().notEmpty().withMessage('Please select your role!')
]
