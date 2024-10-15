import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function AllEntries() {
  const { entries, deleteEntry } = useContext(EntryContext) as EntryContextType;
  let navigate = useNavigate();
  if (entries.length == 0) {
    return (
      <section>
        <h1 className="text-center font-semibold text-2xl m-5 text-black dark:text-white">You don't have any card</h1>
        <p className="text-center font-medium text-md text-black dark:text-gray-300">
          Lets{" "}
          <Link className="text-blue-400 dark:text-blue-300 underline underline-offset-1" to="/create">
            Create One
          </Link>
        </p>
      </section>
    );
  }
  return (
    <section className="flex flex-col items-center">
      {entries.map((entry: Entry, index: number) => {
        return (
          <div
            id={entry.id}
            key={index}
            className="bg-card w-3/5 dark:bg-card shadow-md shadow-gray-500 dark:shadow-gray-900 m-3 p-4 rounded flex flex-col justify-between"
          >
            <h1 className="font-bold text-sm md:text-lg text-foreground dark:text-foreground">{entry.title}</h1>
            <div className="flex flex-row justify-between md:mt-2 md:mb-4 mt-1 mb-3 items-center">
              <div>
                <p className="text-lg font-light text-foreground dark:text-foreground">
                  {entry.description}
                </p>
              </div>
              <section className="flex items-center justify-between flex-col md:flex-row pt-2 md:pt-0">
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      navigate(`/edit/${entry.id}`, { replace: true });
                    }}
                    className="m-1 md:m-2 p-1 font-semibold rounded-md bg-primary hover:bg-primary dark:bg-primary dark:hover:bg-primary"
                  >
                    🖊
                  </button>
                  <button
                    onClick={() => {
                      deleteEntry(entry.id as string);
                    }}
                    className="m-1 md:m-2 p-1 font-semibold rounded-md bg-destructive hover:bg-destructive dark:bg-destructive dark:hover:bg-destructive"
                  >
                    ✖
                  </button>
                </div>
              </section>
            </div>
            {entry.scheduled_for ? (
              <p className="mb-3">Due on {new Date(entry.scheduled_for.toString()).toLocaleDateString()}</p>
            ) : (
              <></>
            )}
            <p className="text-gray-500 text-xs dark:text-gray-400">
              Created at {new Date(entry.created_at.toString()).toLocaleDateString()}
            </p>
          </div>
        );
      })}
    </section>
  );
}
