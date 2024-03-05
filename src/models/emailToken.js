import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tokenSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "user",
            unique: true,
        },
        token: { type: String, required: true },
        createdAt: { type: Date, default: Date.now, expires: 3600 },
    }
);

const EmailToken = mongoose.models.EmailToken || mongoose.model("EmailToken", tokenSchema); // if model is already exist, it will not create a new 

export default EmailToken;