import { handleDraft } from "../pages/investment/term-deposit/create-term-deposit/handleDraft";

describe('handleDraft', () => {
    it('should set setIsConfirmOpen to false when called', () => {
      const setIsConfirmOpen = jest.fn();
      const productData = {};
      const process = "modify";
      const id = "123";
      const modifyRequest = jest.fn();
      const modifyProduct = jest.fn();
      const createProduct = jest.fn();

      handleDraft({ productData, process, id, modifyRequest, setIsConfirmOpen, modifyProduct, createProduct });

      expect(setIsConfirmOpen).toHaveBeenCalledWith(false);
    });
});
