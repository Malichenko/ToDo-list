// Core
import React from "react";
import cx from "classnames";

// Styles
import Styles from "../../share/Styles.module.scss";

export const Tag = (props) => {
  const { tag, setTag, isSelected, selectedCX } = props;

  let tagType;

  switch (tag) {
    case "Sketch":
      tagType = "first";
      break;
    case "Spotify":
      tagType = "second";
      break;
    case "Dribble":
      tagType = "third";
      break;
    case "Behance":
      tagType = "fourth";
      break;
    case "UX":
      tagType = "fifth";
      break;
    default:
      throw new Error("Wrong tag!");
  }

  const tagsCX = cx(`${Styles.tag}`, {[`${selectedCX}`]: isSelected}, `${Styles[tagType]}`,);

  const clickHolder = () => setTag ? setTag(tag) : null;

  return <span className={tagsCX} onClick={clickHolder}>{tag}</span>;
};
