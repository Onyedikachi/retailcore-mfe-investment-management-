
export async function downloadUsingFetch(
  file = "https://dev2-retailcore-teams-management-api.dev.bepeerless.co/v1/Product/template"
) {
  
  const fetchedfiLE = await fetch(file);
  const FILE_NAME = `bulksheet.xlsx`;
  const blob = await fetchedfiLE.blob();
  const linkURL = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = linkURL;
  anchor.download = FILE_NAME;

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(linkURL);
}
