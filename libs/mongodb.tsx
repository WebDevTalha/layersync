import mongoose from "mongoose"
import { MONGODB_URI } from "./env"

const connectMongoDB = () => {
    try {
        mongoose.connect(MONGODB_URI || "undifind")
    } catch (err) {
        console.log(err)
    }
}

export default connectMongoDB
