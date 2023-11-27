export function removeNullEmptyKeys(obj) {
  const newObj = {};

  for (const key in obj) {
    const value = obj[key];

    if (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      (Array.isArray(value) ? value.length > 0 : true)
    ) {
      newObj[key] = value;
    }
  }

  return newObj;
}
