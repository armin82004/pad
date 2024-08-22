import { NoteType } from "../types";
import Note from "./Note";

function NotesList(props: { notes: NoteType[] }) {
  return (
    <div className="notes-list-container">
      {props.notes.map((note) => {
        return (
          <Note
            id={note.id}
            title={note.title}
            content={note.content}
            color={note.color}
            date={note.date}
          />
        );
      })
      }
    </div>
  );
}

export default NotesList;
