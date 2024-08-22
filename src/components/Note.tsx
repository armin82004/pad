type noteprops = {
  id: string;
  title: string;
  content: string;
  color: string;
  date: string;
};

function Note(props: noteprops) {
  return (
    <div className="note-container" style={{backgroundColor:props.color}}>
      <p>{props.title}</p>
      <p>{props.content}</p>
    </div>
  );
}

export default Note;
