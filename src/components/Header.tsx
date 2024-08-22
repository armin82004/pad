import React from "react";
import icons from "../styles/icons";
function Header() {
  return (
    <header>
      <div className="appname-logo-container">
        <span className="menu-icon-container">{icons.menu}</span>
        <h1 className="app-title">Pad</h1>
      </div>
      <span className="search-icon-container">{icons.search}</span>
    </header>
  );
};

export default Header;
