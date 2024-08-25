import React, { useEffect, useRef, useState } from "react";
import icons from "../styles/icons";
import { handlesearchtype, searchtype } from "../types";
function Header(props: {
  sidebar: boolean;
  handlesidebar: () => void;
  handlesearchtype: handlesearchtype;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [search, setsearch] = useState(false);

  function handlesearchclick() {
    setsearch(!search);
  }

  function handlemenuclick() {
    props.handlesidebar();
  }

  const handleclickoutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setsearch(false);
    }
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
  return (
    <header>
      {search ? (
        <>
          <div className="appname-logo-container">
            <span
              onClick={handlemenuclick}
              id="menu-span"
              className="menu-icon-container"
            >
              {icons.menu}
            </span>
          </div>
          <div ref={ref} className="search-container toggle-serach">
            <span className="search-icon-container">{icons.search}</span>
            <input
              placeholder="Search"
              className="search-input"
              type="text"
              onChange={(e) => {
                props.handlesearchtype(e.currentTarget.value);
              }}
            />
          </div>
        </>
      ) : (
        <>
          <div className="appname-logo-container">
            <span
              onClick={handlemenuclick}
              id="menu-span"
              className="menu-icon-container"
            >
              {icons.menu}
            </span>
            <h1 className="app-title">Pad</h1>
          </div>
          <div className="search-container" onClick={handlesearchclick}>
            <span className="search-icon-container">{icons.search}</span>
            <input placeholder="Search" className="search-input" type="text" />
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
