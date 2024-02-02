import { CreateTodo } from '../components/CreateTodo.jsx'
import { MemoizedTodos } from '../components/Todos.jsx'
import { useState, useEffect, useContext } from 'react';
// import jwt from 'jsonwebtoken';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/context/AuthContext.jsx';

export function Home() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [refreshTodos, setRefreshTodos] = useState(false);

  // useEffect(() => {
  //   if(!token) {
  //     navigate("/sign-in");
  //   }
  // }, [token, navigate])

  // useEffect(() => {
  //   if(token === "" || !token || token === undefined || token === null){
      
  //     console.log("token not found");
  //     navigate("/sign-in");
  //   }
  // }, [navigate, token]);

  

  useEffect(() => {
    if(!token || token === "" || token === undefined || token === null) {
      navigate("/sign-in");
    }
  }, [navigate, token])

  console.log("token",token);


  const handleRefreshTodos = () => {
    setRefreshTodos(!refreshTodos);
  }
    


  return (
  <>
    
    <CreateTodo handleRefreshTodos= {handleRefreshTodos} />
    <MemoizedTodos refreshTodos={refreshTodos}/>
    
  </>
  )
}