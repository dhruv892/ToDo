import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export function Todos({refreshTodos} ){
    const [todos, setTodos] = useState([]);
    useEffect(()=>{
        const fetchData = () => {
            fetch("http://localhost:3000/todos")
            .then(async (res) => {
                const temp = await res.json();
                console.log(temp);
                // handlerFunction(temp.todos)
                setTodos(temp.todos)
            })
        }
        fetchData();
    }, [refreshTodos]);
    
    return(   
        <div>
            {
            
            todos.map((todo) => {
                return(
                    <div key={todo._id}>
                        <h3> {todo.title} </h3>
                        <p> {todo.description} </p>
                    </div>
                )
            })
        }
        </div>
    )
        
}

// Prop validation
Todos.propTypes = {
    handlerFunction: PropTypes.func.isRequired,
    todos: PropTypes.array.isRequired,
};

// prop validation
Todos.propTypes = {
    refreshTodos: PropTypes.bool.isRequired,
}

// memoized so it only renders particular todo when it changes
export const MemoizedTodos = React.memo(Todos);