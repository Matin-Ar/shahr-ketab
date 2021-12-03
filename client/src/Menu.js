import React, { useState } from "react";

function Menu({ setSelectedTab }) {
  const [selectedMenu, setSelectedMenu] = useState(1);

  return (
    <nav className="nav-menu">
      <ul className="nav-list">
        <li
          className={selectedMenu === 1 ? `nav-item active` : "nav-item"}
          onClick={() => setSelectedTab(1)}
        >
          کتاب ها{" "}
        </li>
        <li
          className={selectedMenu === 2 ? `nav-item active` : "nav-item"}
          onClick={() => setSelectedTab(2)}
        >
          فاکتور ها{" "}
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
