import express from 'express'
import { createTweet, getAllTweets, deleteTweet, updateTweet, getTweet } from '../controllers/tweet'
import { tweetValidation } from '../validation/tweet'
import tokenMiddleware from '../middlewares/token'

const router = express.Router()

// router.use(tokenMiddleware)

router.get('/tweets', getAllTweets)

router.get('/tweets/:id', getTweet)

router.post('/tweets', tweetValidation, createTweet)

router.put('/tweets/:id', tweetValidation, updateTweet)

router.delete('/tweets/:id', deleteTweet)

export default router
