// Core
import React from "react";
import moment from "moment";
import cx from "classnames";

// Styles
import Styles from "./Styles.module.scss";

// Elements
import { Tag } from "../../../../elements/tag/";

export const ListItem = (props) => {
  const { hash, title, tag, deadline, completed, clickHolder, isSelected } = props;
  const taskCX = cx(`${Styles.task}`, { [`${Styles.completed}`]: completed }, { [`${Styles.selected}`]: isSelected });

  const date = moment(deadline).format("LL");

  return (
    <div id={hash} className={taskCX} onClick={() => clickHolder(hash)}>
      <span className={Styles.title}>{title}</span>
      <div className={Styles.meta}>
        <span className={Styles.deadline}>{date}</span>
        <Tag tag={tag} />
      </div>
    </div>
  );
};
