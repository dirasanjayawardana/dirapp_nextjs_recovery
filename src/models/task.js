import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
    {
        title: String,
        userId: String,
        category: String,
        description: String,
        deadline: String,
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema); // if model with name "Task" is already exist, it will not create a new model

export default Task;