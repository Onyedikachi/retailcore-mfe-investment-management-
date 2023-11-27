export function checkEmpty(uploadData) {
    return uploadData.filter((i) => {
      const isEmpty =
        !i?.streetname ||
        !i?.number ||
        !i?.lga ||
        !i?.city ||
        !i?.state ||
        !i?.country;
      return isEmpty;
    });
  }