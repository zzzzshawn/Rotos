import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async() => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URL) {
        return console.log("missing mongodb connection url")
    }

    if(isConnected){
        return console.log("Mongodb already connected")

    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: 'Rotos',
        })

        isConnected = true;

        console.log("Mongodb connected!!")
    } catch (error) {
        console.log(error)
    }
}