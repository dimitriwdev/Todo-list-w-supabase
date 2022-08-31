import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    return (
      <button
        className="flex justify-around items-center mr-4 px-4 py-2 rounded text-white bg-zinc-800 dark:text-zinc-800 dark:bg-white"
        onClick={() =>
          currentTheme === "dark" ? setTheme("light") : setTheme("dark")
        }
      >
        {currentTheme === "dark" ? "Light" : "Dark"}
      </button>
    );
  };

  return (
    <nav className="h-20 px-4 flex justify-between items-center border-b border-zinc-500 dark:border-cyan-500">
      <div>
        <Link href="/">
          <a className="text-lg font-bold px-8 py-4">Home</a>
        </Link>
        <Link href="/todo-supa">
          <a className="text-lg font-bold px-8 py-4">Todo&nbsp;Supa</a>
        </Link>
      </div>
      <div className="flex items-center">
        {renderThemeChanger()}
        <Link href="/auth">
          <a>
            <button className="text-lg ml-2 p-2">Log in</button>
          </a>
        </Link>
      </div>
    </nav>
  );
}
