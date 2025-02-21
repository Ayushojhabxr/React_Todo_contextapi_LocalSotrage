import React from "react";
import { useTodo } from "../Contexts/TodoContext";
import { useState } from "react";


function TodoItem({ todo }) {
    
const {updateTodo , deleteTodo , toggleComplete } = useTodo()

const [isTodoEditable, setIsTodoEditable] = useState(false);
const [todoMsg, setTodoMsg] = useState(todo.todo); // yha pe todo.todo se humne todo ko get kiya hai

const editTodo = () => {          

updateTodo(todo.id , { // object humesa curly braces me pass krte hai or yha p object hai ...todo or todoMsg
    ...todo, todo: todoMsg}) // yha pe humne updateTodo ko call kiya or usme todo.id or todo pass kiya 
  setIsTodoEditable(false) // yha pe humne setIsTodoEditable ko false kr diya taki hum edit mode se bahar aa jaye   
}

const toggleCompleted = () => {
    toggleComplete(todo.id) // yha pe humne toggleCompleted ko call kiya or usme todo.id pass kiya  taki hum toggle kr ske    
}




    return (
        <div
        className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
            todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
        }`}
    >
        <input
            type="checkbox"
            className="cursor-pointer"
            checked={todo.completed}
            onChange={toggleCompleted}
        />
        <input
            type="text"
            className={`border outline-none w-full bg-transparent rounded-lg ${
                isTodoEditable ? "border-black/10 px-2" : "border-transparent"
            } ${todo.completed ? "line-through" : ""}`}
            value={todoMsg}
            onChange={(e) => setTodoMsg(e.target.value)}
            readOnly={!isTodoEditable}
        />
        {/* Edit, Save Button */}
        <button
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
            onClick={() => {
                if (todo.completed) return;

                if (isTodoEditable) {
                    editTodo();
                } else setIsTodoEditable((prev) => !prev);
            }}
            disabled={todo.completed}
        >
            {isTodoEditable ? "📁" : "✏️"}
        </button>
        {/* Delete Todo Button */}
        <button
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
            onClick={() => deleteTodo(todo.id)}
        >
            ❌
        </button>
    </div>

    );
}

export default TodoItem

