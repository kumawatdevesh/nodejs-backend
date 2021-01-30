import { RequestHandler } from "express"
import ErrorResponse from '../utils/errorResponse'
const jwt = require('jsonwebtoken')

const tokenMiddleware: RequestHandler = (req, res, next) => {

    try {

        if (typeof req.headers.authorization !== 'string') {
            return next(new ErrorResponse('You are not authorized!', 401))
        }

        const tokens = req.headers.authorization.split(' ');

        if (tokens.length < 2) {

            return next(new ErrorResponse('You are not authorized!', 401))
        }

        const token = tokens[1];

        if (!token) {
            return next(new ErrorResponse('You are not authorized!', 401))
        }

        jwt.verify(token, `${process.env.TOKEN_KEY}`);
        next();
    } catch (e) {
        console.log(e)
        return next(new ErrorResponse('Something went wrong!', 500))
    }
};

export default tokenMiddleware