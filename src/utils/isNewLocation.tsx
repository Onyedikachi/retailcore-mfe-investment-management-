export function isNewLocation(oldData, newData) {
  if (!oldData) return true;
  if (
    oldData?.number !== newData?.number ||
    oldData?.streetname !== newData?.streetname ||
    oldData?.city !== newData?.city ||
    oldData?.lga !== newData?.lga ||
    oldData?.state !== newData?.state ||
    oldData?.country !== newData?.country
  ) {
    return true;
  } else {
    return false;
  }
}
