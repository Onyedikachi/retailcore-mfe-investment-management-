export function countDuplicates(array) {
    const uniqueElements = new Set();
    const duplicates = new Set();
  
    array.forEach((element) => {
      if (uniqueElements.has(element)) {
        duplicates.add(element);
      } else {
        uniqueElements.add(element);
      }
    });
  
    return duplicates.size;
  }