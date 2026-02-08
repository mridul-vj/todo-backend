import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
}, {
    timestamps: true,
    versionKey: false
});

const todoModel = mongoose.model("todo", todoSchema);

export default todoModel;