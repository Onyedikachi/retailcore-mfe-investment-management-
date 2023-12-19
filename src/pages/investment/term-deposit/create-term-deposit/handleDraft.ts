export const handleDraft = ({ productData, process, id, modifyRequest, setIsConfirmOpen, modifyProduct, createProduct }) => {
    setIsConfirmOpen(false);
    if (process === "modify") {
        modifyProduct({ ...productData, isDraft: true, id });
    }
    if (process === "create" || process === "clone") {
        createProduct({ ...productData, isDraft: true });
    }
    if (process === "continue" || process === "withdraw_modify") {
        modifyRequest({ ...productData, isDraft: true, id });
    }
}