import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { DarkModeContextType } from "../@types/context";
import { DarkModeContext } from "../utilities/globalContext";

export default function NavBar() {
  const { darkMode, setDarkMode } = useContext(DarkModeContext) as DarkModeContextType;

  return (
    <nav className="flex justify-center gap-5">
      <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
      <NavLink
        className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800 rounded-md font-medium text-white"
        to={"/"}
      >
        All Entries
      </NavLink>
      <NavLink
        className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800 rounded-md font-medium text-white"
        to={"/create"}
      >
        New Entry
      </NavLink>
    </nav>
  );
}
