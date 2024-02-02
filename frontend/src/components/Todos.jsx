import React, { useState } from 'react';
import { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AuthContext } from '../components/context/AuthContext.jsx';
import {jwtDecode} from "jwt-decode";


export function Todos({refreshTodos} ){
    const [todos, setTodos] = useState([]);
    const { token } = useContext(AuthContext);
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    useEffect(()=>{
        const fetchData = async() => {
        
            try{
                // axios.defaults.headers.common['Authorization'] = `Bearer ${ token }`;
                const temp = await axios.get(`http://localhost:3000/todos?userId=${userId}`, {
                    headers: { Authorization: `Bearer ${ token }`  }
                });
                console.log(temp);
                setTodos(temp.data.todos);
            }catch(err){
                console.log(err);
            }
            

        }
        fetchData();
    }, [refreshTodos, setTodos, token, userId]);
    
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