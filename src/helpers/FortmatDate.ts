import moment from "moment";

export function formatDate(inputDate: any) {
  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return new Date(inputDate).toLocaleDateString(undefined, options);
}

export const formatDates = (date: any) => {
  return moment(date).format("DD/MM//YYYY");
};

export const formatDateYYYY = (date: any) => {
  return moment(date).format("MMMM Do YYYY");
};
