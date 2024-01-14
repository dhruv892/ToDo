
import { useState } from 'react';
import PropTypes from 'prop-types';

export function CreateTodo({ onCreateTodo }) {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    return (
        
        <div>
            <h1> Create ToDo</h1>
            <input id="title" type="text" placeholder="Enter Title" onChange={(e)=>{
                setTitle(e.target.value)
            }} />
            <br />
            
            <input id="desc" type="text" placeholder="Enter Description" onChange={(e)=>{
                setDesc(e.target.value)
            }}/> <br />

            <button onClick={() => {
                fetch("http://localhost:3000/todo", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: title,
                        description: desc
                    })
                })
                .then((res)=>{
                    if(res.ok){
                        onCreateTodo();
                        setTitle("");
                        setDesc("");
                    }else{
                        console.log("error on adding new todo");
                    }
                })
            }} style={{marginTop: 5}}> Enter </button>
        </div>
    )
}

// Prop validation
CreateTodo.propTypes = {
    onCreateTodo: PropTypes.func.isRequired,
};