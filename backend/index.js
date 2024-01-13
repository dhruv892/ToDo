const express = require('express');
const cors = require('cors');
// const { createTodoSchema } = require('./type');
const { todo } = require('./db');
const { createTodoSchema ,updateTodoSchema } = require('./type');

const app = express();
app.use(cors("http://localhost:5173/"));
app.use(express.json());

app.get('/todos',async (req, res) => {
    const todos = await todo.find({});
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