function removeDiacritics(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export const convertText = (nameCate: string) => {
  const decodedData = decodeURIComponent(nameCate);
  const cleanedData = removeDiacritics(decodedData).replace(/[^\w\s]/gi, "");
  return cleanedData;
};
