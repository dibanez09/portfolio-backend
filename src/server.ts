import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import router from './routes/index';

dotenv.config();

// express app
const app = express()

//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(express.json());
app.use('/api/v1', router);

//connet to db
const DB_URL = process.env.MONGODB_URI || ''

mongoose.connect(DB_URL)
    .then(() => {
        //listen for request
        const port = process.env.PORT
        app.listen(port, () => {
            console.log(`connected to db, listening on port ${port}`)
        })
    })
    .catch((error) => {
        console.log('error: ', error)
    })