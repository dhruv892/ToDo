
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
// import { useEffect } from 'react';
import { AuthContext } from '../components/context/AuthContext.jsx';

export function CreateTodo({handleRefreshTodos}) {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const { token } = useContext(AuthContext);
  
    // console.log(token);
    const decodedToken = jwtDecode(token);
    const userId = `${decodedToken.id}`;

    

    return (
        
        <div>
            <h1> Create ToDo</h1>
            <input id="title" value={title} type="text" placeholder="Enter Title" onChange={(e)=>{
                setTitle(e.target.value)
            }} />
            <br />
            
            <input id="desc" value={desc} type="text" placeholder="Enter Description" onChange={(e)=>{
                setDesc(e.target.value)
            }}/> <br />

            <button onClick={async () => {
                await axios.post(`http://localhost:3000/todo`, {
                    title: title,
                    description: desc,
                    user: userId
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                setTitle("");
                setDesc("");
                handleRefreshTodos();

            }} style={{marginTop: 5}}> Enter </button>
        </div>
    )
}

//Prop validation
CreateTodo.propTypes = {
    handleRefreshTodos: PropTypes.func.isRequired,
};
