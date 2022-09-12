import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import TodoList from "../Components/TodoList/TodoList";

export default function Index(props) {
  const [inputState, setInputState] = useState("");
  const [todosArray, setTodosArray] = useState([]);
  const [selectedTodos, setSelectedTodos] = useState("All");
  const [filteredTodos, setFilteredTodos] = useState([]);

  // fetch todos on each render
  useEffect(() => {
    setTodosArray(props.todos)
  }, [props.todos]);

  // add todo
  const addTodo = async (e) => {
    e.preventDefault()
    let { data: newTodo, error } = await supabase
      .from('todos')
      .insert({ text: inputState })
      .single();
    if (error === null) {
      setTodosArray([...todosArray, newTodo])
      setInputState('')
    }
  };

  // delete todos
  const handleDelete = async (id) => {
    const { error } = await supabase.from("todos").delete().eq("id", id)
    if (error === null) {
      const newTodoArray = [...todosArray]
      newTodoArray.splice(newTodoArray.findIndex(el => el.id === id), 1)
      setTodosArray(newTodoArray)
    }
  }

  // update todos
  const handleComplete = async (id, todo) => {
    let { error } = await supabase
      .from('todos')
      .update({ completed: !todo.completed })
      .eq('id', id)

    if (error === null) {
      const newTodoArray = [...todosArray]
      newTodoArray[newTodoArray.findIndex(el => el.id === id)].completed = !todo.completed
      setTodosArray(newTodoArray)
    }
  }

  // sort todos
  useEffect(() => {
    if (selectedTodos === "Active") {
      setFilteredTodos(todosArray.filter((todo) => !todo.completed));
    } else if (selectedTodos === "Completed") {
      setFilteredTodos(todosArray.filter((todo) => todo.completed));
    } else {
      setFilteredTodos(todosArray);
    }
  }, [todosArray, selectedTodos]);

  return (
    <div className="text-center w-full flex items-center flex-col mt-4">
      <h1 className="text-2xl font-bold mb-4 text-green-600">Supabase TodoList</h1>
      <form
        className="flex justify-center flex-col w-1/2"
        onSubmit={addTodo}
      >
        <input
          type="text"
          className="p-4 rounded border border-zinc-800 bg-transparent dark:border-gray-300"
          placeholder="What to do?"
          value={inputState}
          onChange={(e) => setInputState(e.target.value)}
          required
        />
        <button className="bg-green-600 py-2 my-4 rounded text-zinc-800 hover:bg-green-700 hover:text-white">
          Add
        </button>
      </form>
      <div className="flex justify-between w-1/2">
        <button
          className={`p-2 border border-zinc-800 w-1/3 rounded dark:border-gray-300 hover:bg-zinc-800 hover:text-white dark:hover:bg-gray-300 dark:hover:text-zinc-800 ${selectedTodos === "All"
            ? "bg-zinc-800 text-gray-300 dark:bg-gray-300 dark:text-zinc-800"
            : ""
            }`}
          onClick={() => setSelectedTodos("All")}
        >
          All
        </button>
        <button
          className={`p-2 mx-2 border border-zinc-800 w-1/3 rounded dark:border-gray-300 hover:bg-zinc-800 hover:text-white dark:hover:bg-gray-300 dark:hover:text-zinc-800 ${selectedTodos === "Active"
            ? "bg-zinc-800 text-gray-300 dark:bg-gray-300 dark:text-zinc-800"
            : ""
            }`}
          onClick={() => setSelectedTodos("Active")}
        >
          Active
        </button>
        <button
          className={`p-2 border border-zinc-800 w-1/3 rounded dark:border-gray-300 hover:bg-zinc-800 hover:text-white dark:hover:bg-gray-300 dark:hover:text-zinc-800 ${selectedTodos === "Completed"
            ? "bg-zinc-800 text-gray-300 dark:bg-gray-300 dark:text-zinc-800"
            : ""
            }`}
          onClick={() => setSelectedTodos("Completed")}
        >
          Completed
        </button>
      </div>
      <div className="flex justify-start w-1/2 mt-4 mb-3 pl-2">
        <p>
          <span className="text-green-600 mr-1">{selectedTodos}</span>Todo items
        </p>
      </div>
      <ul className="w-1/2">
        {filteredTodos.map((todo) => {
          return (
            <TodoList
              key={todo.id}
              handleComplete={handleComplete}
              todo={todo}
              handleDelete={handleDelete}
            />
          );
        })}
      </ul>
    </div >
  )
}

export async function getServerSideProps() {
  const { data } = await supabase.from('todos').select('*').order('id', { ascending: true })
  const todos = data

  return {
    props: { todos }
  }
}