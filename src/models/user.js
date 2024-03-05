import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: { type: String },
        email: {
            type: String,
            trim: true,
            unique: true,
        },
        password: { type: String },
        role: { type: String },
        isVerified: { type: Boolean },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;