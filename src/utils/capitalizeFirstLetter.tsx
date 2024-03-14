export function capitalizeFirstLetter(inputString) {
  if (typeof inputString !== "string" || inputString.length === 0) {
    return "";
  }

  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}
