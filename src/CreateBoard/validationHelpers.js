export const validateName = name => {
  if (!name) {
    return false;
  }
  return name.length >= 3;
};

export const isBackgroundSelected = backgrounds => {
  const selectedBackground = backgrounds.find(item => item.isPressed);
  return selectedBackground ? true : false;
};
