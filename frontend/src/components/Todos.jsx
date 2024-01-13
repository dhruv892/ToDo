
export function Todos(todos){

    // setTodos(temp)
    return(
        <div>
            {
            todos.todos.map((todo) => {
                return(
                    <div key={todo.id}>
                        <h1> {todo.title} </h1>
                        <p> {todo.description} </p>
                    </div>
                )
            })
        }
        </div>
    )
        
}