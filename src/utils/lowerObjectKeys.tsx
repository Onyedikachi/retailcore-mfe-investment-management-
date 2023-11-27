export function lowerObjectKeys(arrayOfObjects) {
  if (!Array.isArray(arrayOfObjects)) {
    throw new Error("Input must be an array of objects");
  }

  return arrayOfObjects.map((obj) => {
    const newObj = {};
    for (const key in obj) {
      const lowerKey = key.toLowerCase();
      newObj[lowerKey] = obj[key];
    }
    return newObj;
  });
}
