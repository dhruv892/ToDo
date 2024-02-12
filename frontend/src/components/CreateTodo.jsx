
import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { useRecoilValue } from 'recoil';
import { tokenAtom } from './store/atoms.jsx';

export function CreateTodo({handleRefreshTodos}) {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const  token  = useRecoilValue(tokenAtom);
  
    // console.log(token);
    // const decodedToken = jwtDecode(token);
    // const userId = `${decodedToken.id}`;

    

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
                },
                {
                    headers: { Authorization: `Bearer ${ token }`  }
                })
                setTitle("");
                setDesc("");
                await handleRefreshTodos();

            }} style={{marginTop: 5}}> Enter </button>
        </div>
    )
}

//Prop validation
CreateTodo.propTypes = {
    handleRefreshTodos: PropTypes.func.isRequired,
};
