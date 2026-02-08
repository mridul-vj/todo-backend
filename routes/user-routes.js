import express from 'express';
import userModel from '../models/user-model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express.Router();

app.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (email === "" || password === "" || name === "") return res.status(400).json("All fields are required!");

        const userFound = await userModel.findOne({ email: email });
        if (userFound) return res.status(404).json({ message: "User Already Found!" });

        // Password Encryption
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);

        // Create User
        const newUser = await userModel.create({ email: email, password: hashedPassword, name: name });

        console.log(newUser);

        // Generate JWT Token
        const token = jwt.sign({ id: newUser._id, email: newUser.email, name: newUser.name }, "SecretKey");

        const user = {
            email: newUser.email,
            name: newUser.name,
            userId: newUser._id,
            createdAt: newUser.createdAt
        }
        res.token = token;

        res.status(201).json({ message: "User Registered Successfully!", token: token, user: user });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email });
        if (!user) return res.status(404).json({ message: "User Not Found!" });

        // Check if user password is correct or not
        const result = bcrypt.compare(password, user.password);

        // Check user via jwt to send token
        const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, "SecretKey");

        const loggedInUser = {
            email: user.email,
            name: user.name,
            userId: user._id,
            createdAt: user.createdAt
        }
        if (result) return res.status(200).json({ message: "User logged in successfully!", token: token, user: loggedInUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

app.delete('/delete/:id', async (req, res) => {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
        console.log("User Deleted");
        res.status(404).send({ "message": "User not found!" });
    } else {
        console.log("Deleted");
        res.status(200).send({ "message": "User deleted successfully!" });
    }
});

export default app;