import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState({})

  function handleTextChange(){
    setText(event.target.value)
  }

  useEffect(() => {
    fetchTodos()
  }, [])
  const fetchTodos = async () => {
    const data = await fetch("http://localhost:3000/todos")
    const json = await data.json()
    setTodos(json)
  }
  const handleSubmit = async () => {
    const addTodo = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: text.length > 0 && text  
    })
    if(addTodo.status === 201){
      fetchTodos()
    }
    else{
      console.log("Error")
    }
  }
  const Todo = (props) => {
    const { list } = props
    return(
      <>
      {list.map((todo) => {
        return (
          <div className='todos'>
            <p>{todo.title}</p>
            <p>{todo.description}</p>
            <button onClick={async () => {
              const url = "http://localhost:3000/todos/" + todo.id
              const fetchDelete = await fetch(url, {
                method: "DELETE",
                headers: {'Content-Type': 'application/json'}
              })
              if(fetchDelete.status === 200){
                fetchTodos()
              }
            }}>Delete</button>
          </div>
        )
      })}
      </>
    )
}
  
  return (
    <>
    <div className="addTodo">
    <textarea onChange={handleTextChange} placeholder='Add Todo' />
    <button onClick={handleSubmit}>Submit</button>
    </div>
    <Todo list={todos}/>
    </>
  )

}
export default App
