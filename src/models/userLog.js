import mongoose, { Schema } from "mongoose";

const userLogSchema = new Schema(
    {
        name: { type: String },
        email: { type: String },
        role: { type: String },
        isSuccess: { type: Boolean },
    },
    {
        timestamps: true,
    }
);

const UserLog = mongoose.models.UserLog || mongoose.model("UserLog", userLogSchema);

export default UserLog;