import express from 'express';
import './config/mongo_connection.js'; // Initialize MongoDB connection
import userRoutes from './routes/user-routes.js';
import userTodos from './routes/todo-routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("ToDo backend server is running!");
});

app.use('/auth', userRoutes);
app.use('/todo', userTodos);


// Start server (works for both local and Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;