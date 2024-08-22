import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { type NoteType } from "./types";
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [Notes, setNotes] = useState<NoteType[]>([
    {
      id: uuidv4(),
      title: "firstnote",
      color: "coral",
      content: "notecontent",
      date: "12:35",
    },
    {
      id: uuidv4(),
      title: "firstnote",
      color: "peach",
      content: "notecontent",
      date: "12:35",
    },
  ]);

  function handleaddnote(title:string,color:string,content:string) {
    const d = new Date();
    const newdate = d.getHours() + ":" + d.getMinutes();
    const note = {
      id:uuidv4(),
      title:title,
      content:content,
      color:color,
      date:newdate,
    };

    setNotes([...Notes, note]);
  }
  return (
    <>
      <Header />
      <Main notes={Notes} handleaddnote={handleaddnote} />
    </>
  );
}

export default App;
