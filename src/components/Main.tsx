import React from "react";
import AddNote from "./AddNote";
import { handleaddnote, NoteType } from "../types";
import NotesList from "./NotesList";

function Main(props: {
  notes: NoteType[];
  handleaddnote:handleaddnote;
}) {
  return (
    <main>
      <AddNote notes={props.notes} handleaddnote={props.handleaddnote}/>
      <NotesList notes={props.notes}/>
    </main>
  );
}

export default Main;
