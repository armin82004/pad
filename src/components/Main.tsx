import React from "react";
import AddNote from "./AddNote";
import {
  handleaddnote,
  handledeletenote,
  handleeditnote,
  NoteType,
} from "../types";
import NotesList from "./NotesList";

function Main(props: {
  notes: NoteType[];
  handleaddnote: handleaddnote;
  handleeditnote: handleeditnote;
  handledeletenote: handledeletenote;
}) {
  return (
    <main>
      <AddNote notes={props.notes} handleaddnote={props.handleaddnote} />
      <NotesList
        notes={props.notes}
        handleeditnote={props.handleeditnote}
        handledeletenote={props.handledeletenote}
      />
    </main>
  );
}

export default Main;
