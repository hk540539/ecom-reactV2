import React from "react";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import MenuItem from "../menu-item/menu-item.component";
import "./directory.style.scss";
import { selectDirectorySections } from "../../redux/directory/directory.selector";

const Directory = () => {
  const { sections } = useSelector(
    createStructuredSelector({ sections: selectDirectorySections })
  );
  return (
    <div className="directory-menu">
      {sections.map(({ id, ...reamingSectionProps }) => (
        <MenuItem key={id} {...reamingSectionProps} />
      ))}
    </div>
  );
};

export default Directory;
