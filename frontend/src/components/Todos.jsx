import React, { useState } from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export function Todos({refreshTodos} ){
    const [todos, setTodos] = useState([]);
    useEffect(()=>{
        const fetchData = async() => {
        
            try{
                const temp = await axios.get("http://localhost:3000/todos");
                console.log(temp);
                setTodos(temp.data.todos);
            }catch(err){
                console.log(err);
            }
            

        }
        fetchData();
    }, [refreshTodos, setTodos]);
    
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

// // Prop validation
// Todos.propTypes = {
//     handlerFunction: PropTypes.func.isRequired,
//     todos: PropTypes.array.isRequired,
// };

// prop validation
Todos.propTypes = {
    refreshTodos: PropTypes.bool.isRequired,
}

// memoized so it only renders particular todo when it changes
export const MemoizedTodos = React.memo(Todos);