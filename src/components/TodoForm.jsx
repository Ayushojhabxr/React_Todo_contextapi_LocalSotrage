import React, { use } from "react";
import { useState } from "react";

import { useTodo } from '../Contexts/TodoContext';

function TodoForm() {     
    const [todo, setTodo] = useState("")// yha pe humne todo ko state me rkha hai or setTodo se hum usko update kr rhe hai
    
    const {addTodo} = useTodo()

    const add = (e) => {
        e.preventDefault() // yha pe preventDefault use kiya hai taki page refresh na ho
        addTodo({
             todo, // yha pe humne object pass kiya jisme todo hai jo humne input field me dala hoga jo humne app.jsx me addTodo me pass kiya hai
            completed: false
        }) // yha pe humne addTodo ko call kiya or usme object pass kiya jisme title or completed hai
        setTodo('') // yha pe humne setTodo ko empty string de diya taki input field khali ho jaye
    }
    
    return (
        <form onSubmit={add}  className="flex">
          <input
              type="text"
              placeholder="Write Todo..."
              className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
              Add
          </button>
      </form>
    );
}
export default TodoForm