export function convertKeysToLowerCase(obj) {
  if (typeof obj !== 'object' || obj === null) {
    // If the input is not an object or is null, return as is
    return obj;
  }

  const result = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // Convert the first character of the key to lowercase
      const lowercaseKey = key.charAt(0).toLowerCase() + key.slice(1);
      // Recursively convert nested objects
      result[lowercaseKey] = convertKeysToLowerCase(obj[key]);
    }
  }

  return result;
}