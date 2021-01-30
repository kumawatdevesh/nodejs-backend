import { RequestHandler } from "express";
import { validationResult } from 'express-validator'
import ErrorResponse from '../utils/errorResponse'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user/user'
import Verification from '../models/verification/verification'

export const signUp: RequestHandler = async (req, res, next) => {

    const validationResultArray = validationResult(req)

    if (!validationResultArray.isEmpty() && validationResultArray['errors']) {
        return next(new ErrorResponse(validationResultArray['errors'][0].msg, 400))
    }

    const { firstName, lastName, email, password, role } = req.body

    try {

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {

                const user = new User({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hash,
                    role: role
                })

                const result = await user.save()
                const token = jwt.sign({ user: result }, process.env.TOKEN_KEY!)
                return res.json({ token: token })
            })
        })

    } catch (e) {
        return next(new ErrorResponse('Couldn\'t sign up, Please try again!', 502))
    }
}

export const updateUser: RequestHandler = async (req, res, next) => {

    const validationResultArray = validationResult(req)

    if (!validationResultArray.isEmpty() && validationResultArray['errors']) {
        return next(new ErrorResponse(validationResultArray['errors'][0].msg, 400))
    }

    const { firstName, lastName, email, password, role } = req.body
    const userId = req.params.id

    try {

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {

                let userDetails = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hash,
                    role: role
                }

                if (role === 'user') {

                    // update if role is user
                    const updatedUser = await User.findByIdAndUpdate({ _id: userId }, { userDetails })

                    return res.json({ user: updatedUser })
                } else if (role === 'admin') {

                    // craete verification request from super admin if role is admin
                    const verification = new Verification({
                        verified: false,
                        resource: userDetails,
                        type: 'user',
                        request: 'update',
                        resourceId: userId
                    })

                    const createdVerification = await verification.save()

                    return res.json({ verification: createdVerification })
                }
            })
        })

    } catch (e) {
        return next(new ErrorResponse('Couldn\'t upldate user, Please try again!', 502))
    }
}

export const login: RequestHandler = async (req, res, next) => {

    const validationResultArray = validationResult(req)

    if (!validationResultArray.isEmpty() && validationResultArray['errors']) {
        return next(new ErrorResponse(validationResultArray['errors'][0].msg, 400))
    }

    const { email, password } = req.body

    try {

        const user = await User.findOne({ email: email })

        if (!user) {
            return res.json({ err: "User not found!" })
        }

        bcrypt.compare(password, user.password, async (err, result) => {

            if (result) {

                const token = await jwt.sign({ user: user }, `${process.env.TOKEN_KEY!}`)
                return res.json({ token: token })

            } else if (err) {
                return res.json({ err: 'Password is wrong!' })
            }
        })
    } catch (e) {
        return next(new ErrorResponse('Couldn\'t log in, Please try again!', 502))
    }
}