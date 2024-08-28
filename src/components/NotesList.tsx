import { handledeletenote, handleeditnote, NoteType } from "../types";
import Note from "./Note";

function NotesList(props: {
  notes: NoteType[];
  handleeditnote: handleeditnote;
  handledeletenote: handledeletenote;
}) {
  let isempty = false
  if(props.notes.length === 0){
    isempty = true
  }else{
    isempty = false
  }
  return (
    <div className="notes-list-container">
      {isempty ? (
        <div className="emptycontainer">
          <p>Empty</p>
        </div>
      ):(
        props.notes.map((note) => {
          return (
            <Note
              key={note.id}
              handleeditnote={props.handleeditnote}
              handledeletenote={props.handledeletenote}
              id={note.id}
              title={note.title}
              content={note.content}
              color={note.color}
              date={note.date}
              archived={note.archived}
            />
          );
        })
      )}
      {}
    </div>
  );
}

export default NotesList;
