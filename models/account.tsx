import mongoose, { Schema } from "mongoose"

const accountSchema = new Schema(
    {
        account: String,
        isFromRefaer: String,
        isFromReferCode: String,
        ownReferCode: String,
        txnHistory: Array,
        points: Number,
    },
    {
        timestamps: true,
    },
)

const Account = mongoose.model("Account", accountSchema)

export default Account
