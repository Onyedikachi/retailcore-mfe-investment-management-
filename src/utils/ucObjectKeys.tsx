export function ucObjectKeys(arrayOfObjects) {
  if (!Array.isArray(arrayOfObjects)) {
    throw new Error("Input must be an array of objects");
  }

  return arrayOfObjects.map((obj) => {
    const newObj = {};
    for (const key in obj) {
      // if (obj.hasOwnProperty(key)) {
      const capitalizedKey = key.toUpperCase();
      newObj[capitalizedKey] = obj[key];
      // }
    }
    return newObj;
  });
}
