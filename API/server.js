import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'

dotenv.config();

import router from './router.js';

const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(router);

const dbUrl = "mongodb://localhost:27017/store-api"

app.listen(port, async () => {

    await mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log(`Example app listening at http://localhost:${port}`)
});






