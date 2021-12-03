import React, { useState } from "react";

function Menu() {
  const [selectedMenu, setSelectedMenu] = useState(1);

  return (
    <nav className="nav-menu">
      <ul className="nav-list">
        <li
          className={selectedMenu === 1 ? `nav-item active` : "nav-item"}
          onClick={() => setSelectedMenu(1)}
        >
          کتاب ها{" "}
        </li>
        <li
          className={selectedMenu === 2 ? `nav-item active` : "nav-item"}
          onClick={() => setSelectedMenu(2)}
        >
          فاکتور ها{" "}
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
