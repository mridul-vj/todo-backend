import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
}, {
    timestamps: true, // This adds createdAt and updatedAt automatically
    versionKey: false // This removes the __v field
});

const todoModel = mongoose.model("todo", todoSchema);

export default todoModel;