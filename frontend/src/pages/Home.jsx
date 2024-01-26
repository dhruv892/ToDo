import { CreateTodo } from '../components/CreateTodo.jsx'
import { MemoizedTodos } from '../components/Todos.jsx'
import { useState } from 'react'

export function Home() {
  const [refreshTodos, setRefreshTodos] = useState(false);

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