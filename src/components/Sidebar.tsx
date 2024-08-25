import { useEffect, useRef, useState } from "react";
import icons from "../styles/icons";

function Sidebar(props: {
  sidebar: boolean;
  handlesidebar: () => void;
  handlesidebaroutside: (sidebarstate: boolean) => void;
}) {
  const [selecteditem, setselecteditm] = useState("Notes");
  const ref = useRef<HTMLDivElement>(null);
  function handleitemclick(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    itemName: string
  ) {
    setselecteditm(itemName);
  }

  function handleclickoutsidemenu(event: MouseEvent) {
    const menuSpanElement = document.getElementById("menu-span");
    if (
      ref.current &&
      !ref.current.contains(event.target as Node) &&
      menuSpanElement &&
      !menuSpanElement.contains(event.target as Node)
    ) {
      props.handlesidebaroutside(false);
    }
  }

  useEffect(() => {
    function handleclick(event: MouseEvent) {
      handleclickoutsidemenu(event);
    }
    document.addEventListener("click", handleclick);
    return () => {
      document.removeEventListener("click", handleclick);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        ref={ref}
        className={`sidebar-container ${props.sidebar ? "toggle" : null}`}
      >
        <div
          onClick={(e) => {
            handleitemclick(e, "Notes");
          }}
          className={`sidebar-item ${
            selecteditem === "Notes" ? "toggle-sidebar-item" : ""
          }`}
        >
          <div className="sidebar-icon-container">{icons.note}</div>
          <span>Notes</span>
        </div>
        <div
          onClick={(e) => {
            handleitemclick(e, "Archive");
          }}
          className={`sidebar-item ${
            selecteditem === "Archive" ? "toggle-sidebar-item" : ""
          }`}
        >
          <div className="sidebar-icon-container">{icons.archive_big}</div>
          <span>Archive</span>
        </div>
        <div
          onClick={(e) => {
            handleitemclick(e, "New Lable");
          }}
          className={`sidebar-item ${
            selecteditem === "New Lable" ? "toggle-sidebar-item" : ""
          }`}
        >
          <div className="sidebar-icon-container">{icons.new_lable}</div>
          <span>New Lable</span>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
