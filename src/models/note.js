import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
    {
        title: String,
        userId: String,
        description: String,
    },
    {
        timestamps: true,
    }
);

const Note = mongoose.models.Note || mongoose.model("Note", noteSchema); // if model with name "Note" is already exist, it will not create a new model

export default Note;