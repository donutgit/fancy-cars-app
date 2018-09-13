import React from "react";

const List = props => {
  return (
    <ul className="list-group">
      {props.items.map(function(item) {
        return (
          <li className="list-group-item" data-category={item} key={item}>
            {item}
          </li>
        );
      })}
    </ul>
  );
};

export default List;
