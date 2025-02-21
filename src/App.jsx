
import React, { use } from 'react'
import { TodoProvider } from './Contexts'
import { useState , useEffect } from 'react'
import TodoForm from './components/TodoForm'  
import TodoItem from './components/TodoItem'


function App() {
   const [todos, setTodos] = useState([])

   const addTodo = (todo) => { // yha pe todo aya hoga jo humne form me dala hoga
     setTodos((prev) => [{id:Date.now() , ...todo} , ...prev]) // set krege todos me todo ko jo usesate me hai
   }

   const updateTodo = (id , todo) => {
      setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)) // jo har todo milega loop k baad jiske liye map use kiya hai uska id match hua to uska todo update kr denge
      ) // map function s har ek todo mil jayega // jo prevTodo hai wo to hai har ek todo hai // or y jo id hai wo hai gyi huie id // or jo todo hai wo hai jo humne update krna hai
   }

   const deleteTodo = (id) => {
     setTodos((prev) => prev.filter((todo) => todo.id !== id)) // jo todo hai uska id match nhi hua to usko filter kr denge
   }
 // prev gives the acces to the previous state
//  const toogleComplete = (id) => {
//    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? {...prevTodo , completed : !prevTodo.completed} : prevTodo)) // jo todo hai uska id match hua to uska completed ko toggle kr denge
//    ) // phle sare values or bs id match krke ek overide kr diya
//  } //check kr rhe hai ki todo ka id match hua to us todo k completed section ko cahnge krege baki same rkhege
const toggleComplete = (id) => {
  //console.log(id);
  setTodos((prev) => 
  prev.map((prevTodo) => 
    prevTodo.id === id ? { ...prevTodo, 
      completed: !prevTodo.completed } : prevTodo))
}
 // yha se local storage ka code hai
 
 useEffect(() => {
  const todos = JSON.parse(localStorage.getItem("todos")) // yha pe todos ko get kiya hai or parse kiya hai

  if (todos && todos.length > 0) { // yha pe todos hai or todos ki length 0 se badi hai to  
    setTodos(todos)
  }
}, [])

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos)) // yha pe todos ko string me convert krke local storage me set kiya hai
}, [todos])





  return (
    <TodoProvider value={{todos , addTodo , updateTodo , deleteTodo , toggleComplete}}>
    <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
