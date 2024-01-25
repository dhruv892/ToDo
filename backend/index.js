const express = require('express');
const cors = require('cors');
// const { createTodoSchema } = require('./type');
const { Todo } = require('./db');
const { createTodoSchema ,updateTodoSchema } = require('./type');
const authController = require('./authController');

const app = express();
app.use(cors("http://localhost:5174/"));
app.use(express.json());



app.post('/signup', authController.signup);
app.post('/login', authController.login);

app.get('/todos',async (req, res) => {
    const todos = await Todo.find({});
    res.json({
        todos: todos
    })
})
app.post('/todo',async (req, res) => {
    const createPayLoad = req.body;
    const parsedPayload = createTodoSchema.safeParse(createPayLoad);

    if(!parsedPayload.success){
        res.status(411).json({
            msg: "Please provide valid input"
        })
        return;
    }
    await todo.create({
        title: createPayLoad.title,
        description: createPayLoad.description,
        completed: false
    })

    res.json({
        msg: "Todo created successfully"
    })
})


app.listen(3000);