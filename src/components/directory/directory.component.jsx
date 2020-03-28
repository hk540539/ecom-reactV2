import React from "react";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import MenuItem from "../menu-item/menu-item.component";
// import "./directory.style.scss";
import { selectDirectorySections } from "../../redux/directory/directory.selector";

import { DirectoryMenuContainer } from "./directory.style";

const Directory = () => {
  const { sections } = useSelector(
    createStructuredSelector({ sections: selectDirectorySections })
  );
  return (
    <DirectoryMenuContainer>
      {sections.map(({ id, ...reamingSectionProps }) => (
        <MenuItem key={id} {...reamingSectionProps} />
      ))}
    </DirectoryMenuContainer>
  );
};

export default Directory;
