export function capitalizeObjectKeys(arrayOfObjects) {
  if (!Array.isArray(arrayOfObjects)) {
    throw new Error("Input must be an array of objects");
  }

  return arrayOfObjects.map((obj) => {
    const newObj = {};
    for (const key in obj) {
      // if (obj.hasOwnProperty(key)) {
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      newObj[capitalizedKey] = obj[key];
      // }
    }
    return newObj;
  });
}
