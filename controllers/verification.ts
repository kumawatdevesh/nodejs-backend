import { RequestHandler } from "express";
import ErrorResponse from '../utils/errorResponse'
import Verification from '../models/verification/verification'
import User from '../models/user/user'
import Tweet from '../models/tweet/tweet'
const ObjectId = require('mongodb').ObjectId;

export const verification: RequestHandler = async (req, res, next) => {

    const verificationId = req.params.id

    try {

        const verification = await Verification.findById({ _id: verificationId })

        // check for verification type and request type

        if (verification?.request === 'create') {

            if (verification.type === 'tweet') {
                // if request is create and type is tweet

                try {

                    const tweet = await new Tweet(verification['resource'])

                    const createdTweet = await tweet.save()
                    await verification.remove()

                    return res.json({ tweet: createdTweet })

                } catch (e) {
                    return next(new ErrorResponse('Couldn\'t upload tweet, Please try again!', 502))
                }
            }
        } else if (verification?.request === 'update') {

            if (verification.type === 'tweet') {
                //  if request is update and type is tweet

                try {
                    const tweetDetails = verification['resource']

                    const updatedTweet = await Tweet.findByIdAndUpdate(
                        { _id: ObjectId(verification.resourceId) },
                        { tweetDetails }
                    )
                    await verification.remove()

                    return res.json({ tweet: updatedTweet })

                } catch (e) {
                    return next(new ErrorResponse('Couldn\'t update tweet, Please try again!', 502))
                }
            } else if (verification.type === 'user') {
                //  if request is update and type is tweet

                try {
                    const userDetails = verification['resource']

                    const updatedUser = await User.findByIdAndUpdate(
                        { _id: ObjectId(verification.resourceId) },
                        { userDetails }
                    )
                    await verification.remove()

                    return res.json({ tweet: updatedUser })

                } catch (e) {
                    return next(new ErrorResponse('Couldn\'t update user, Please try again!', 502))
                }
            }
        } else if (verification?.request === 'delete') {

            if (verification.type === 'user') {
                // if request id delete and type is user

                try {
                    const userId = verification.resourceId

                    await User.findByIdAndRemove({ _id: userId })
                    await verification.remove()

                    return res.json({ tweet: userId })

                } catch (e) {
                    return next(new ErrorResponse('Couldn\'t delete user, Please try again!', 502))
                }
            } else if (verification.type === 'tweet') {
                // if request is tweet and type is tweet

                try {
                    const tweetId = verification.resourceId

                    await Tweet.findByIdAndRemove({ _id: tweetId })
                    await verification.remove()

                    return res.json({ tweet: tweetId })

                } catch (e) {
                    return next(new ErrorResponse('Couldn\'t delete tweet, Please try again!', 502))
                }
            }
        }

    } catch (e) {
        return next(new ErrorResponse('Couldn\'t verify request, Please try again!', 502))
    }
}