import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import router from './routes/index';

dotenv.config();
import { seeder } from './seeder/seed';

// express app
const app = express()
app.use(cors());
//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(express.json());

app.use('/api/v1', router);

//connet to db
const DB_URL = `mongodb://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASSWORD || '')}@${process.env.DB_SERVER}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`

mongoose.connect(DB_URL)
    .then(() => {
        //listen for request
        const port = process.env.PORT || 3000
        app.listen(port, () => {
            console.log(`connected to db, listening on port ${port}`)
            try {
                seeder();
            } catch (error) {
                console.error('Error initializing data:', error);
            }
        })

    })
    .catch((error) => {
        console.log('error: ', error)
    })