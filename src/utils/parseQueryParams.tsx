export const parseQueryParams = (queryParams: any) => {
  const params = new URLSearchParams();
  Object.keys(queryParams).forEach((key) => {
    if (queryParams[key] instanceof Array) {
      queryParams[key].forEach((item: any) => {
        params.append(`${key}`, item);
      });
    } else {
      if (typeof queryParams[key] === "boolean") {
        params.set(key, queryParams[key]);
      } else if (!!queryParams[key]) {
        params.set(key, queryParams[key]);
      }
    }
  });
  return params;
};
