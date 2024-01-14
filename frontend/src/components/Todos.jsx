import React from 'react';
import { useState, useEffect } from 'react';
export function Todos(){

    const [todos, setTodos] = useState([]);

    // this fetch data needs to be separate from the useEffect
    // so that it does not go in infinite loop
    const fetchData = () => {
        fetch("http://localhost:3000/todos")
        .then(async (res) => {
            const temp = await res.json();
            console.log(temp);
            setTodos(temp.todos)
        })
    }

    useEffect(()=>{
        fetchData();
    }, []);
    console.log(todos);
    return(   
        <div>
            {
            
            todos.map((todo, index) => {
                return(
                    <div key={index}>
                        <h3> {todo.title} </h3>
                        <p> {todo.description} </p>
                    </div>
                )
            })
        }
        </div>
    )
        
}

// memoized so it only renders particular todo when it changes
export const MemoizedTodos = React.memo(Todos);