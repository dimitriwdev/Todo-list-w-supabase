import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
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
        className="flex justify-around items-center mr-4 px-4 py-2 rounded text-green-600 bg-zinc-800 dark:text-zinc-800 dark:bg-green-600"
        onClick={() =>
          currentTheme === "dark" ? setTheme("light") : setTheme("dark")
        }
      >
        {currentTheme === "dark" ? "Light" : "Dark"}
      </button>
    );
  };

  return (
    <nav className="h-20 px-4 flex justify-between items-center border-b border-zinc-500 dark:border-green-600">
      <h1>Supabase <span className="text-green-600">+</span> Tailwind</h1>
      <div className="">
        {renderThemeChanger()}
      </div>
    </nav>
  );
}
