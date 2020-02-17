import moment from "moment";

const momentFilter = value => {
  if (!value) return moment().toISOString();
  return moment(value).toISOString();
};

export { momentFilter as default };
