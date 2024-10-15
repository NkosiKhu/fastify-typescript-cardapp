import { ChangeEvent, MouseEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function EditEntry() {
  const { id } = useParams();
  const emptyEntry: Entry = { title: "", description: "", created_at: new Date(), scheduled_for:null };

  const { updateEntry, entries } = useContext(EntryContext) as EntryContextType;
  const [newEntry, setNewEntry] = useState<Entry>(emptyEntry);
  const [isScheduled, setIsScheduled] = useState<boolean>(false);

  useEffect(() => {
    const entry = entries.filter((entry) => entry.id == id)[0];
    if(entry){
      setNewEntry(entry);
      setIsScheduled(!!entry.scheduled_for)
    }
  }, []);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    if (type === "checkbox") {
      const checked = (event.target as HTMLInputElement).checked; 

      setIsScheduled(checked);
      setNewEntry({
        ...newEntry,
        scheduled_for: checked ? newEntry.scheduled_for : null,
      });
    } else {
      setNewEntry({
        ...newEntry,
        [name]: value,
      });
    }
  };
  const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
    updateEntry(id as string, newEntry);
  };
  return (
    <section className="flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 bg-gray-300 dark:bg-gray-700 p-8 rounded-md">
      <input
        className="p-3 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
        type="text"
        placeholder="Title"
        name="title"
        value={newEntry.title}
        onChange={handleInputChange}
      />
      <textarea
        className="p-3 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
        placeholder="Description"
        name="description"
        value={newEntry.description}
        onChange={handleInputChange}
      />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isScheduled}
          onChange={handleInputChange}
        />
        <label className="text-black dark:text-white">Schedule</label>
      </div>
      {isScheduled && (
        <input
          className="p-3 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
          type="date"
          name="scheduled_for"
          value={newEntry.scheduled_for ? new Date(newEntry.scheduled_for).toISOString().split('T')[0] : ""}
          onChange={handleInputChange}
        />
      )}
      <button
        onClick={(e) => {
          handleSend(e);
        }}
        className="bg-blue-400 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-900 font-semibold text-white p-3 rounded-md"
      >
        Update
      </button>
    </section>
  );
}
