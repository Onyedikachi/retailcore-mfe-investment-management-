export async function downloadUsingFetch(url) {
  const fetchedfiLE = await fetch(url);
  const FILE_NAME = `download`;
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
