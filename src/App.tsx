import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { type NoteType } from "./types";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./components/Sidebar";
function App() {
  const d = new Date();
  const [sidebar, setsidebar] = useState(false);
  let newdate;
  if (d.getMinutes() < 10) {
    // eslint-disable-next-line no-useless-concat
    newdate = d.getHours() + ":" + "0" + d.getMinutes();
  } else {
    newdate = d.getHours() + ":" + d.getMinutes();
  }

  function handlesidebaroutside(sidebarstate: boolean) {
    setsidebar(sidebarstate);
  }

  const completedate = newdate + ", " + d.toLocaleDateString();
  const [Notes, setNotes] = useState<NoteType[]>([
    {
      id: uuidv4(),
      title: "firstnote",
      color: "coral",
      content: "notecontent",
      date: completedate,
    },
    {
      id: uuidv4(),
      title: "firstnote",
      color: "peach",
      content: "notecontent",
      date: completedate,
    },
  ]);

  function handleaddnote(title: string, color: string, content: string) {
    const d = new Date();
    let newdate;
    if (d.getMinutes() < 10) {
      // eslint-disable-next-line no-useless-concat
      newdate = d.getHours() + ":" + "0" + d.getMinutes();
    } else {
      newdate = d.getHours() + ":" + d.getMinutes();
    }
    const completedate = newdate + " " + d.toLocaleDateString();
    const note = {
      id: uuidv4(),
      title: title,
      content: content,
      color: color,
      date: completedate,
    };

    setNotes([...Notes, note]);
  }

  function handleeditnote(
    id: string,
    title: string,
    color: string,
    content: string
  ) {
    const d = new Date();
    let newdate;
    if (d.getMinutes() < 10) {
      // eslint-disable-next-line no-useless-concat
      newdate = d.getHours() + ":" + "0" + d.getMinutes();
    } else {
      newdate = d.getHours() + ":" + d.getMinutes();
    }

    const completedate = newdate + ", " + d.toLocaleDateString();
    const newNotes = Notes.map((note) =>
      note.id === id
        ? {
            ...note,
            title: title,
            content: content,
            color: color,
            date: completedate,
          }
        : note
    );

    setNotes(newNotes);
  }

  function handledeletenote(id: string) {
    const newNotes = Notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  function handlesidebar() {
    setsidebar(!sidebar);
  }

  return (
    <div className="app-container">
      <Header sidebar={sidebar} handlesidebar={handlesidebar} />
      <Sidebar
        sidebar={sidebar}
        handlesidebar={handlesidebar}
        handlesidebaroutside={handlesidebaroutside}
      />
      <Main
        notes={Notes}
        handleeditnote={handleeditnote}
        handleaddnote={handleaddnote}
        handledeletenote={handledeletenote}
      />
    </div>
  );
}

export default App;
