import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password should be at least 8 characters']
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now().toString()
    },
    updatedAt: {
        type: Date,
        default: Date.now().toString()
    }
}, {
    timestamps: true, // This adds createdAt and updatedAt automatically
    versionKey: false // This removes the __v field
});

const userModel = mongoose.model("user", userSchema);

export default userModel;