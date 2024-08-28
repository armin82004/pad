import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { type NoteType } from "./types";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./components/Sidebar";
function App() {
  const d = new Date();
  const [sidebar, setsidebar] = useState(false);
  const [searchnote, setsearchnote] = useState("");
  const [isarchived, setisarchived] = useState(false);
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
      content: "first-notecontent",
      date: completedate,
      archived: true,
    },
    {
      id: uuidv4(),
      title: "secoundnote",
      color: "peach",
      content: "secound-notecontent",
      date: completedate,
      archived: true,
    },
  ]);

  function handleaddnote(
    title: string,
    color: string,
    content: string,
    archived: boolean
  ) {
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
      archived: archived,
    };

    setNotes([...Notes, note]);
  }

  function handleeditnote(
    id: string,
    title: string,
    color: string,
    content: string,
    archived: boolean
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
            archived: archived,
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

  function handlesearchtype(text: string) {
    setsearchnote(text);
  }

  function handlenotefilter(isarchived: boolean) {
    setisarchived(isarchived);
  }
  return (
    <div className="app-container">
      <Header
        sidebar={sidebar}
        handlesidebar={handlesidebar}
        handlesearchtype={handlesearchtype}
      />
      <Sidebar
        sidebar={sidebar}
        handlenotefilter={handlenotefilter}
        handlesidebar={handlesidebar}
        handlesidebaroutside={handlesidebaroutside}
        notes={Notes}
      />
      <Main
        notes={Notes.filter((note) => {
          const titleMatch = note.title
            .toLowerCase()
            .includes(searchnote.toLowerCase());
          const contentMatch = note.content
            .toLowerCase()
            .includes(searchnote.toLowerCase());
          return (titleMatch || contentMatch) && isarchived
            ? note.archived === true
            : (titleMatch || contentMatch);
        })}
        handleaddnote={handleaddnote}
        handleeditnote={handleeditnote}
        handledeletenote={handledeletenote}
      />
    </div>
  );
}

export default App;
