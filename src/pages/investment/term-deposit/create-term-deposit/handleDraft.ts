export const handleDraft = ({
  productData,
  process,
  id,
  modifyRequest,
  setIsConfirmOpen,
  modifyProduct,
  createProduct,
}) => {
  setIsConfirmOpen(false);
  if (process === "modify" && id) {
    modifyProduct({ ...productData, isDraft: true, id });
    return;
  }
  if ((process === "create" || process === "clone") && !id) {
    createProduct({ ...productData, isDraft: true });
    return;
  }
  if (
    process === "continue" ||
    process === "withdraw_modify" ||
    (process === "create" && id)
  ) {
    modifyRequest({ ...productData, isDraft: true, id });
    return;
  }
};
