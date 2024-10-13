import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { DarkModeContextType } from "../@types/context";
import { DarkModeContext } from "../utilities/globalContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { GearIcon } from "@radix-ui/react-icons"

export default function NavBar() {
  const { darkMode, setDarkMode } = useContext(DarkModeContext) as DarkModeContextType;

  return (
    <nav className="flex justify-between items-center px-20">
      <div className="flex gap-5">
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
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" size="icon">
            <GearIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div>
            <Button
              onClick={() => { setDarkMode(!darkMode) }}
            >Theme: {darkMode ? "Dark" : "Light"}</Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}