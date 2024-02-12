import { CreateTodo } from '../components/CreateTodo.jsx'
import { MemoizedTodos } from '../components/Todos.jsx'
import { useState, useEffect, useContext } from 'react';
// import jwt from 'jsonwebtoken';
import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../components/store/atoms.jsx';
import { tokenAtom } from '../components/store/atoms.jsx';
import { useRecoilValue } from 'recoil';

export function Home() {
  const token = useRecoilValue(tokenAtom);
  const navigate = useNavigate();
  const [refreshTodos, setRefreshTodos] = useState(false);

  useEffect(() => {
    if(!token || token === "") {
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