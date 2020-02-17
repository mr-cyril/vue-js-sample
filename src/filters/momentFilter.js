import moment from "moment";

const momentFilter = value => {
  if (!value) return moment().format("L HH:mm");
  return moment(value).format("L HH:mm");
};

export { momentFilter as default };
