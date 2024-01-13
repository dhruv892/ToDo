import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { CreateTodo } from './components/CreateTodo.jsx'
import { Todos } from './components/Todos.jsx'

function App() {

  const [todos, setTodos] = useState([]);
    // const temp = debounce(timeout)
    useEffect(()=>{
        fetch("http://localhost:3000/todos")
        .then(async (res) => {
            const temp = await res.json();
            setTodos(temp.todos)
        })
    }, [todos])

  return (
    <>
      <CreateTodo />
      <Todos todos={todos} />
    </>
  )
}

export default App
