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
                    <CardWrapper key={todo._id}>
                        <h3> {todo.title} </h3>
                        <p> {todo.description} </p>
                    </CardWrapper>
                )
            })
        }
        </div>
    )
        
}

function CardWrapper({children}){
    return(
        <div style={{
            border: "1px solid gray", 
            padding: 10, 
            margin: 10,
            }}>
            {children}
        </div>
    )
}

// prop validation
Todos.propTypes = {
    refreshTodos: PropTypes.bool.isRequired,
}
CardWrapper.propTypes = {
    children: PropTypes.node.isRequired,
}

// memoized so it only renders particular todo when it changes
export const MemoizedTodos = React.memo(Todos);