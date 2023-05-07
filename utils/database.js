import mongoose from "mongoose";

let isConnected = false; //track the connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;

        console.log('mongodb is connected');
    } catch (err) {
        console.log(err);
    }
}