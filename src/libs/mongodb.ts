import mongoose from 'mongoose'
const MONGO_URL = ''

export const connectMongoDB = async () => {
    try{
        await mongoose.connect(MONGO_URL);
        console.log("Connect to mongoDB");
    } catch (error) {
        console.log(error);
    }
};