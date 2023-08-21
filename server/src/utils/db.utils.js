import mongoose from 'mongoose';
import logger from '../logger/index';

// const DB_URL = ;
// DB_URI = mongodb://127.0.0.1:27017/pinterest

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
        logger.warn('Connected to DB')
    } catch (error) {
        logger.error(error);
    }
};