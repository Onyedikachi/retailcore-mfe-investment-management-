export function checkDocuments(keys, obj) {
  console.log("🚀 ~ checkDocuments ~ keys:", keys);
  console.log("🚀 ~ checkDocuments ~ obj:", obj);
  if (!obj) return;
  if (!keys) return;
  const documents = keys.map((key) => {
    const words = key.split(" ");
    const camelCaseWords = words.map((word, index) => {
      if (index === 0) {
        return word.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase();
      } else {
        return (
          word
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .charAt(0)
            .toUpperCase() + word.slice(1).toLowerCase()
        );
      }
    });

    return {
      camelCaseName: camelCaseWords.join(""),
      originalName: key,
    };
  });
  console.log("🚀 ~ documents ~ documents:", documents);

  let missingDocuments = [];

  for (const doc of documents) {
    if (
      !(doc.camelCaseName in obj) ||
      obj[doc.camelCaseName] === undefined ||
      obj[doc.camelCaseName] === null ||
      (obj[doc?.camelCaseName] &&
        JSON.parse(obj[doc?.camelCaseName])?.length === 0)
    ) {
      missingDocuments.push(doc.originalName);
    }
  }

  return {
    hasAllDocuments: missingDocuments.length === 0,
    missingDocuments: missingDocuments,
    reason:
      missingDocuments.length === 0
        ? ""
        : `The following documents are missing: ${missingDocuments.join(", ")}`,
  };
}
