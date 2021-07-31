export const validateName = name => {
  if (!name) {
    return false;
  }
  return name.length >= 1;
};
