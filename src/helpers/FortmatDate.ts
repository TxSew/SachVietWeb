import moment from "moment";

export const formatDates = (date: any) => {
  return moment(date).format("DD/MM/YYYY");
};
export const formatDate = (date: any) => {
  return moment(date).format("DD/MM/YYYY");
};
export const formatDateYYYY = (date: any) => {
  return moment(date).format("MMMM Do YYYY");
};
