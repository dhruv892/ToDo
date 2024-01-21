import { useState } from 'react'
import './App.css'
import { CreateTodo } from './components/CreateTodo.jsx'
import { MemoizedTodos } from './components/Todos.jsx'
import { RecoilRoot } from 'recoil'
// import { set } from 'mongoose';

function App() {
  // const [todos, setTodos] = useState([]);
  const [refreshTodos, setRefreshTodos] = useState(false);

  const handleRefreshTodos = () => {
    setRefreshTodos(!refreshTodos);
  }
  // const handlerFunction = (newTodo)=>{
  //   setTodos(newTodo);
  
  // }
  return (
    <>
      <CreateTodo handleRefreshTodos= {handleRefreshTodos} />
      <RecoilRoot>
        <MemoizedTodos refreshTodos={refreshTodos}/>
      </RecoilRoot>
    </>
  )
}

export default App