import React from "react";

export default function Footer() {
  return (
    <div className="h-20 mt-8 flex justify-center items-center border-t border-zinc-500 dark:border-cyan-500">
      <p>
        Copyright &copy; <span className="font-bold">Dimitri Devoille</span>{" "}
        {new Date().getFullYear()}
      </p>
    </div>
  );
}
