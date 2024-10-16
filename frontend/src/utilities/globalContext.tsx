import axios from "axios";
import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeContextType, Entry, EntryContextType } from "../@types/context";

export const EntryContext = createContext<EntryContextType | null>(null);

export const EntryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const navigate = useNavigate();

  const initState = async () => {
    const data = await axios.get<Entry[]>(`${import.meta.env.VITE_API_URL}/get/`);
    const initialStateBody = data.data;
    setEntries(initialStateBody);
  };

  useEffect(() => {
    initState();
  }, []);

  const saveEntry = async (entry: Entry) => {
    try {
      const requestData = await axios.post<Entry>(`${import.meta.env.VITE_API_URL}/create/`, entry);
      const newEntry = requestData.data;
      setEntries([...entries, newEntry]);

      // Redirect to the home page after successful creation
      navigate("/");
    } catch (error) {
      console.error("Error creating entry:", error);
    }
  };

  const updateEntry = async (id: string, entry: Entry) => {
    try{

      await axios.put<Entry>(`${import.meta.env.VITE_API_URL}/update/${id}`, entry);
      setEntries((entries) => {
        const entryIndex = entries.findIndex((obj) => obj.id == id);
        entries[entryIndex] = entry;
        return entries;
      });
      navigate("/");

    } catch (error) {
      console.error("Error creating entry:", error);

    }
  };
  const deleteEntry = async (id: string) => {
    await axios.delete<Entry>(`${import.meta.env.VITE_API_URL}/delete/${id}`);
    setEntries((e) => e.filter((entry) => entry.id != id));
  };
  return (
    <EntryContext.Provider value={{ entries, saveEntry, updateEntry, deleteEntry }}>{children}</EntryContext.Provider>
  );
};

export const DarkModeContext = createContext<DarkModeContextType | null>(null);

export const DarkModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("darkMode");
    return storedTheme ? JSON.parse(storedTheme) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>{children}</DarkModeContext.Provider>;
};
