import React, { useEffect, useRef, useState } from "react";
import icons from "../styles/icons";
import { type NoteType } from "../types";
type newnotetype = Omit<NoteType, "date" | "id">;
function AddNote(props: {
  notes: NoteType[];
  handleaddnote: (
    title: string,
    color: string,
    content: string,
    archived: boolean
  ) => void;
}) {
  const textarearef = useRef<HTMLTextAreaElement>(null);
  const [isediting, setisediting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const titleref = useRef<HTMLInputElement>(null);
  const [isarchived, setisarchived] = useState(false);
  const [color, setcolor] = useState(false);
  const [newnote, setnewnote] = useState<newnotetype>({
    color: "#fffcea",
    content: "",
    title: "",
    archived: false,
  });
  let coloval = ["coral", "peach", "sand", "mint", "sage", "dusk"];
  function handleinputfocus() {
    setisediting(!isediting);
  }
  const handleclickoutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setisediting(false);
      setcolor(false);
      setnewnote({ title: "", content: "", color: "#fffcea", archived: true });
      if (titleref.current) {
        titleref.current.value = "";
      }
      setisarchived(false);
    }
  };

  const handlecolorsclick = () => {
    setcolor(!color);
  };

  useEffect(() => {
    function handleclick(event: MouseEvent) {
      handleclickoutside(event);
    }
    document.addEventListener("click", handleclick);
    return () => {
      document.removeEventListener("click", handleclick);
    };
  }, []);

  function handletextareachange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setnewnote({ ...newnote, content: event.currentTarget.value });
  }

  useEffect(() => {
    if (textarearef.current) {
      textarearef.current.style.height = "auto";
      textarearef.current.style.height = `${textarearef.current.scrollHeight}px`;
    }
  }, [newnote.content]);

  function handletitlechange(event: React.ChangeEvent<HTMLInputElement>) {
    setnewnote({ ...newnote, title: event.currentTarget.value });
  }

  function handlecolor(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const classname = event.currentTarget.className;

    if (classname.includes("coral")) {
      setnewnote({ ...newnote, color: "#FAAFA8" });
    } else if (classname.includes("peach")) {
      setnewnote({ ...newnote, color: "#F39F76" });
    } else if (classname.includes("sand")) {
      setnewnote({ ...newnote, color: "#FFF8B8" });
    } else if (classname.includes("mint")) {
      setnewnote({ ...newnote, color: "#E2F6D3" });
    } else if (classname.includes("sage")) {
      setnewnote({ ...newnote, color: "#B4DDD3" });
    } else if (classname.includes("dusk")) {
      setnewnote({ ...newnote, color: "#D3BFDB" });
    }
  }

  function handlesaveclick() {
    if (
      titleref.current &&
      titleref.current.value.trim() !== "" &&
      textarearef.current &&
      textarearef.current.value.trim() !== ""
    ) {
      props.handleaddnote(
        newnote.title,
        newnote.color,
        newnote.content,
        isarchived
      );

      setisediting(false);
      setcolor(false);
      setnewnote({ title: "", content: "", color: "#fffcea", archived: false });
      if (titleref.current) {
        titleref.current.value = "";
      }
    }
  }

  function handlearchiveclick() {
    setisarchived(!isarchived);
    setnewnote({ ...newnote, archived: !isarchived });
  }
  return (
    <div className="container">
      <div
        style={{ backgroundColor: newnote.color }}
        ref={ref}
        className={
          isediting ? "add-note-container-focused" : "add-note-container"
        }
      >
        {isediting ? (
          <>
            <input
              ref={titleref}
              value={newnote.title}
              onChange={handletitlechange}
              className="text-input"
              type="text"
              placeholder="Title"
            />
            <textarea
              ref={textarearef}
              value={newnote.content}
              onChange={handletextareachange}
              className="content-textarea"
              placeholder="Take a note..."
            />
            <div className="add-note-footer">
              <div className="footer-left-container">
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
                    isarchived ? "icon-container-toggle" : "icon-container "
                  }`}
                  onClick={handlearchiveclick}
                >
                  {isarchived ? icons.archive_toggle : icons.archive}
                </div>
              </div>
              <button onClick={handlesaveclick} className="save-btn">
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            <input
              className="text-input"
              type="text"
              placeholder="Take a note..."
              onFocus={handleinputfocus}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default AddNote;
