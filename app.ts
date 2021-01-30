require('dotenv').config()
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { errorResponse } from './middlewares/error'
import UserRoute from './routes/user'
import TweetRoute from './routes/tweet'
import VerificationRoute from './routes/verification'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
    next();
});

app.use('/api', UserRoute)
app.use('/api', TweetRoute)
app.use('/api', VerificationRoute)
app.use(errorResponse)

mongoose.connect(process.env.MONGODB_URI!)
    .then(() => {
        app.listen(process.env.PORT_NO || 5000)
    })
    .catch(e => {
        console.log(e)
    })
