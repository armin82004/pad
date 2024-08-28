import React, { useState } from "react";
import { handledeletenote, type handleeditnote } from "../types";
import icons from "../styles/icons";

type noteprops = {
  id: string;
  title: string;
  content: string;
  color: string;
  date: string;
  archived: boolean;
  handleeditnote: handleeditnote;
  handledeletenote: handledeletenote;
};

function Note(props: noteprops) {
  const [isediting, setisediting] = useState(false);
  const [color, setcolor] = useState(false);
  let coloval = ["coral", "peach", "sand", "mint", "sage", "dusk"];
  function handlenoteclick() {
    setisediting(!isediting);
  }

  function handleedit(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    if (event.currentTarget instanceof HTMLInputElement) {
      props.handleeditnote(
        props.id,
        event.currentTarget.value,
        props.color,
        props.content,
        props.archived
      );
    } else if (event.currentTarget instanceof HTMLTextAreaElement) {
      props.handleeditnote(
        props.id,
        props.title,
        props.color,
        event.currentTarget.value,
        props.archived
      );
    }
  }

  const handlecolorsclick = () => {
    setcolor(!color);
  };

  function handlecolor(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const classname = event.currentTarget.className;
    console.log(classname);

    if (classname.includes("coral")) {
      props.handleeditnote(
        props.id,
        props.title,
        "#FAAFA8",
        props.content,
        props.archived
      );
      console.log("hello");
    } else if (classname.includes("peach")) {
      props.handleeditnote(
        props.id,
        props.title,
        "#F39F76",
        props.content,
        props.archived
      );
    } else if (classname.includes("sand")) {
      props.handleeditnote(
        props.id,
        props.title,
        "#FFF8B8",
        props.content,
        props.archived
      );
    } else if (classname.includes("mint")) {
      props.handleeditnote(
        props.id,
        props.title,
        "#E2F6D3",
        props.content,
        props.archived
      );
    } else if (classname.includes("sage")) {
      props.handleeditnote(
        props.id,
        props.title,
        "#B4DDD3",
        props.content,
        props.archived
      );
    } else if (classname.includes("dusk")) {
      props.handleeditnote(
        props.id,
        props.title,
        "#D3BFDB",
        props.content,
        props.archived
      );
    }
  }

  function handledelete() {
    setisediting(false);
    props.handledeletenote(props.id);
  }

  function handlearchiveclick() {
    let isarchiveed = !props.archived;
    props.handleeditnote(
      props.id,
      props.title,
      props.color,
      props.content,
      isarchiveed
    );
  }

  return (
    <>
      <div
        className="note-container"
        onClick={handlenoteclick}
        style={{ backgroundColor: props.color }}
      >
        <p>{props.title}</p>
        <p>{props.content}</p>
      </div>
      {isediting && (
        <div className="dialog-overlay">
          <div className="dialog" style={{ backgroundColor: props.color }}>
            <input
              onChange={handleedit}
              type="text"
              value={props.title}
              className="text-input"
            />
            <textarea
              value={props.content}
              onChange={handleedit}
              className="content-textarea"
            ></textarea>
            <small className="date-text">Edited: {props.date}</small>
            <div className="dialog-footer">
              <div className="color-container">
                <div className="icon-container" onClick={handlecolorsclick}>
                  {icons.colorpalette}
                </div>
                {color ? (
                  <>
                    {coloval.map((col) => {
                      return (
                        <div
                          onClick={(event) => handlecolor(event)}
                          className={col + " colors"}
                        ></div>
                      );
                    })}
                  </>
                ) : null}
                <div
                  className={`${
                    props.archived ? "icon-container-toggle" : "icon-container "
                  }`}
                  onClick={handlearchiveclick}
                >
                  {props.archived ? icons.archive_toggle : icons.archive}
                </div>
                <div className="icon-container" onClick={handledelete}>
                  {icons.delete}
                </div>
              </div>
              <button onClick={handlenoteclick}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Note;
