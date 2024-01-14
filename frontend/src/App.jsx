import { useState } from 'react'
import './App.css'
import { CreateTodo } from './components/CreateTodo.jsx'
import { MemoizedTodos } from './components/Todos.jsx'

function App() {
  const [refreshTodos, setRefreshTodos] = useState(false);

  const handleRefreshTodos = () => {
    setRefreshTodos(!refreshTodos);
  }
  return (
    <>
      <CreateTodo onCreateTodo = {handleRefreshTodos}/>
      <MemoizedTodos key= {refreshTodos}/>
    </>
  )
}
  
export default App