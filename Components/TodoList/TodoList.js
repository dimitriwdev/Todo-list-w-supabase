import React from "react";

export default function TodoList(props) {
  const { todo, handleDelete, handleComplete } = props;

  return (
    <li className="mt-2 flex items-center justify-between cursor-pointer rounded border border-zinc-800 dark:border-gray-300">
      <div
        className="p-4 w-full text-left"
        style={{
          textDecorationLine: todo.completed && "line-through",
          color: todo.completed && "gray",
        }}
        onClick={() => handleComplete(todo.id, todo)}
      >
        <span>{todo.text}</span>
      </div>
      <button
        className="py-1 px-2 mr-4 border border-red-500 rounded hover:bg-red-500"
        onClick={() => handleDelete(todo.id)}
      >
        X
      </button>
    </li>
  );
}
