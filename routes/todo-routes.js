import express from 'express';
import todoModel from '../models/todo-model.js'
import isLoggedIn from '../controllers/auth-verifier.js';

const app = express.Router();

// Get All Todos
app.get('/get', isLoggedIn, async (req, res) => {
    try {
        const todos = await todoModel.find();
        res.status(200).json({ todos: todos });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

// Create Todo
app.post('/create', isLoggedIn, async (req, res) => {
    try {
        const { title, description } = req.body;
        if (title === "" || description === "") {
            return res.status(400).json({ message: "Title and Description should not be empty or null!" });
        }
        const titles = await todoModel.find();
        titles.forEach((val) => {
            if (title === val.title) {
                console.log(`Loop is running${val.title}`);

                res.status(406).send({ "message": "Title should be unique!" })
                return
            }
        })

        const todo = await todoModel.create({ title: title, description: description });
        res.status(200).json({ message: "To-Do Item Created!", data: todo });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

// Edit Todo
app.patch('/edit/:id', isLoggedIn, async (req, res) => {
    try {
        if (title === "" || description === "") {
            return res.status(400).json({ message: "Title and Description should not be empty or null!" });
        }
        const todoEdit = await todoModel.findByIdAndUpdate(req.params.id, req.body, { new: true, overwrite: true });
        res.status(200).json({ message: "Updated Successfully.", todo: todoEdit });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

// Delete Todo
app.delete('/delete/:id', isLoggedIn, async (req, res) => {
    try {
        const todoDelCheck = await todoModel.findById(req.params.id);
        if (!todoDelCheck) {
            return res.status(404).json({ message: "To-Do Item Not Found!" });
        } else {
            await todoModel.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: "Item deleted successfully!" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

export default app;