import mongoose from "mongoose";

const connectTOMongoDB = async () => {
    try {
        await mongoose.connect(process.env.Mongo_DB_URL);
        console.log("connected to Mongodb")
    }
    catch (error) {
        console.log("Error to connect to Db")
    }
}

export default connectTOMongoDB;