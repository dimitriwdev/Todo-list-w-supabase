import React from "react";

export default function Footer() {
  return (
    <div className="h-20 mt-8 flex justify-center items-center border-t border-zinc-500 dark:border-green-600">
      <p>
        Copyright &copy; <span className="font-bold text-green-600">Dimitri Devoille</span>{" "}
        {new Date().getFullYear()}
      </p>
    </div>
  );
}
