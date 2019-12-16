import React from "react";

import "./listitems.css";

function Listitems(props) {
  const items = props.items;
  if (!items) { // evaluates to true if currentVideo is null
    return <div></div>; 
  }
  else{
  const LI = items.map(item => {
    return (
      <div className="list" key={item.key}>
        <p>
          <input
            type="text"
            value={item.text}
            onChange={e => {
              props.setUpdate(e.target.value, item.key);
            }}
          />
          <button className="btn" onClick={() => props.deleteItem(item.key)}>
            Delete
          </button>
        </p>
      </div>
    );
  });
  return <div>{LI}</div>;
}
}
export default Listitems;
