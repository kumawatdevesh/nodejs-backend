import { RequestHandler } from "express";
import { validationResult } from 'express-validator'
import ErrorResponse from '../utils/errorResponse'
import Tweet from '../models/tweet/tweet'
import Verification from '../models/verification/verification'

export const createTweet: RequestHandler = async (req, res, next) => {

    // check for all fields
    const validationResultArray = validationResult(req)

    if (!validationResultArray.isEmpty() && validationResultArray['errors']) {
        return next(new ErrorResponse(validationResultArray['errors'][0].msg, 400))
    }

    const { title, description, createdBy, role } = req.body

    try {

        const tweet = new Tweet({
            title,
            description,
            createdBy
        })

        if (role === 'user') {

            // if role is user create tweet 
            const createdTweet = await tweet.save()

            return res.json({ tweet: createdTweet })
        } else if (role === 'admin') {

            // if role us admin create verification request
            const verification = new Verification({
                verified: false,
                resource: tweet,
                type: 'tweet',
                request: 'create'
            })

            const createdVerification = await verification.save()

            return res.json({ verification: createdVerification })
        }

    } catch (e) {
        return next(new ErrorResponse('Couldn\'t upload tweet, Please try again!', 502))
    }
}

export const updateTweet: RequestHandler = async (req, res, next) => {

    // check for all fields
    const validationResultArray = validationResult(req)

    if (!validationResultArray.isEmpty() && validationResultArray['errors']) {
        return next(new ErrorResponse(validationResultArray['errors'][0].msg, 400))
    }

    const { title, description, createdBy, role } = req.body
    const tweetId = req.params.id

    const tweetDetails = {
        title,
        description,
        createdBy
    }

    try {

        if (role === 'user') {
            // if role  is user 
            // const updatedTweet = await Tweet.findByIdAndUpdate({ _id: tweetId }, { tweetDetails })

            // return res.json({ tweet: updatedTweet })

            return next(new ErrorResponse('You do not have right to update tweet!', 401))
        } else if (role === 'admin') {

            // if role us admin create verification request
            const verification = new Verification({
                verified: false,
                resource: tweetDetails,
                type: 'tweet',
                request: 'update',
                resourceId: tweetId
            })

            const createdVerification = await verification.save()

            return res.json({ verification: createdVerification })
        }

    } catch (e) {
        return next(new ErrorResponse('Couldn\'t upload tweet, Please try again!', 502))
    }
}

export const getTweet: RequestHandler = async (req, res, next) => {

    const tweetId = req.params.id

    try {
        const tweet = await Tweet.findById({ _id: tweetId })

        return res.json({ tweet: tweet })
    } catch (e) {
        return next(new ErrorResponse('Couldn\'t get tweet, Please try again!', 502))
    }
}

export const getAllTweets: RequestHandler = async (req, res, next) => {

    try {
        const tweets = await Tweet.find()
        console.log(tweets)
        return res.json({ tweets: tweets })
    } catch (e) {
        return next(new ErrorResponse('Couldn\'t get tweets, Please try again!', 502))
    }
}

export const deleteTweet: RequestHandler = async (req, res, next) => {

    const tweetId = req.params.id
    const { role } = req.body

    try {
        if (role === 'user') {
            await Tweet.findByIdAndRemove({ _id: tweetId })

            return res.json({ deleted: tweetId })
        } else if (role === 'admin') {

            // if role us admin create verification request
            const verification = new Verification({
                verified: false,
                type: 'tweet',
                request: 'delete',
                resourceId: tweetId
            })

            const createdVerification = await verification.save()

            return res.json({ verification: createdVerification })
        }
    } catch (e) {
        return next(new ErrorResponse('Couldn\'t delete tweet, Please try again!', 502))
    }
}


