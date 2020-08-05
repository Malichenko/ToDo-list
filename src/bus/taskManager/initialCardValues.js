// Core
import moment from "moment";
const deadline = moment().endOf("day").toDate();

export const initialCardValues = Object.freeze({
  title: "",
  tag: "",
  checklist: [],
  deadline: deadline,
  completed: false,
  description: "",
});
