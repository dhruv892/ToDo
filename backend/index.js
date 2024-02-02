const express = require('express');
const cors = require('cors');
// const { createTodoSchema } = require('./type');
const { Todo } = require('./db');
const { createTodoSchema ,updateTodoSchema } = require('./type');
const authController = require('./authController');
// const cookieParser = require('cookie-parser');

const app = express();
// app.use(cookieParser());
app.use(cors("http://localhost:5174/"));
app.use(express.json());


app.post('/signup', authController.signup);
app.post('/login', authController.login);

app.get('/todos', authController.protect,async (req, res) => {
    try{
        const userId = req.query.userId;
        const todos = await Todo.find({user: userId});
        res.json({
        todos: todos
    })
    }catch(err){
        res.status(500).json({
            msg: "Something went wrong with server"
        })
    }
    
})
app.post('/todo',async (req, res) => {
    const createPayLoad = req.body;
    console.log(createPayLoad);
    const parsedPayload = await createTodoSchema.safeParse(createPayLoad);
    // const userId = req.query.userId;


    if(!parsedPayload.success){
        res.status(411).json({
            msg: "Please provide valid input"
        })
        return;
    }
    try{
        await Todo.create({
            title: createPayLoad.title,
            description: createPayLoad.description,
            user: createPayLoad.user,
            completed: false,
            
        })
        
    
        res.json({
            msg: "Todo created successfully"
        })
    }catch(err){
        res.status(500).json({
            msg: "Something went wrong with server"
        })
    }
})


app.listen(3000);