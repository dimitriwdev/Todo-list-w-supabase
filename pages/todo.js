import React, { useState, useEffect } from "react";
import TodoList from "../Components/TodoList/TodoList";
export default function Todo() {
  const [inputState, setInputState] = useState("");
  const [todos, setTodos] = useState([
    { id: 1, text: "todo 1", completed: true },
    { id: 2, text: "todo 2", completed: false },
  ]);
  const [selectedTodos, setSelectedTodos] = useState("All");
  const [filteredTodos, setFilteredTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newArr = [...todos];
    const newTodos = {};

    newTodos.id = Date.now();
    newTodos.text = inputState;
    newTodos.completed = false;

    setTodos([...newArr, newTodos]);
    setInputState("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleComplete = (id) => {
    const completedTodo = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(completedTodo);
  };

  useEffect(() => {
    if (selectedTodos === "Active") {
      setFilteredTodos(todos.filter((todo) => !todo.completed));
    } else if (selectedTodos === "Completed") {
      setFilteredTodos(todos.filter((todo) => todo.completed));
    } else {
      setFilteredTodos(todos);
    }
  }, [todos, selectedTodos]);

  return (
    <div className="text-center w-full flex items-center flex-col mt-4">
      <h1 className="text-2xl font-bold mb-4">TodoList Using State</h1>
      <form
        className="flex justify-center flex-col w-1/2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="p-4 rounded border border-zinc-800 bg-transparent dark:border-gray-300"
          placeholder="What to do?"
          value={inputState}
          onChange={(e) => setInputState(e.target.value)}
          required
        />
        <button className="bg-cyan-500 py-2 mt-4 rounded text-zinc-800 hover:bg-cyan-800 hover:text-white">
          Add
        </button>
      </form>
      <div className="mt-4 flex justify-between w-1/2">
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
          <span className="text-cyan-500">{selectedTodos} </span> Todo items
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
    </div>
  );
}
