export const validateForm = (value: any) => {
  if (/<script[\s\S]*<\/script>/i.test(value)) {
    return "Script tags are not allowed.";
  }

  return true;
};
