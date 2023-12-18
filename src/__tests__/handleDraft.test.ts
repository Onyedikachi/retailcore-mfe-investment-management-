import { handleDraft } from "../pages/investment/term-deposit/create-term-deposit/handleDraft";

describe('handleDraft', () => {

    // Sets setIsConfirmOpen to false
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

    // Calls modifyProduct with isDraft set to true if process is "modify"
    it('should call modifyProduct with isDraft set to true when process is "modify"', () => {
      const setIsConfirmOpen = jest.fn();
      const productData = {};
      const process = "modify";
      const id = "123";
      const modifyRequest = jest.fn();
      const modifyProduct = jest.fn();
      const createProduct = jest.fn();

      handleDraft({ productData, process, id, modifyRequest, setIsConfirmOpen, modifyProduct, createProduct });

      expect(modifyProduct).toHaveBeenCalledWith({ ...productData, isDraft: true, id });
    });

    // Calls createProduct with isDraft set to true if process is "create" or "clone"
    it('should call createProduct with isDraft set to true when process is "create" or "clone"', () => {
      const setIsConfirmOpen = jest.fn();
      const productData = {};
      const process = "create";
      const id = "123";
      const modifyRequest = jest.fn();
      const modifyProduct = jest.fn();
      const createProduct = jest.fn();

      handleDraft({ productData, process, id, modifyRequest, setIsConfirmOpen, modifyProduct, createProduct });

      expect(createProduct).toHaveBeenCalledWith({ ...productData, isDraft: true });
    });

    // process is undefined
    it('should not call any functions when process is undefined', () => {
      const setIsConfirmOpen = jest.fn();
      const productData = {};
      const process = undefined;
      const id = "123";
      const modifyRequest = jest.fn();
      const modifyProduct = jest.fn();
      const createProduct = jest.fn();

      handleDraft({ productData, process, id, modifyRequest, setIsConfirmOpen, modifyProduct, createProduct });

      expect(modifyProduct).not.toHaveBeenCalled();
      expect(createProduct).not.toHaveBeenCalled();
      expect(modifyRequest).not.toHaveBeenCalled();
    });

    // productData is undefined
    it('should not call any functions when productData is undefined', () => {
      const setIsConfirmOpen = jest.fn();
      const productData = undefined;
      const process = "modify";
      const id = "123";
      const modifyRequest = jest.fn();
      const modifyProduct = jest.fn();
      const createProduct = jest.fn();

      handleDraft({ productData, process, id, modifyRequest, setIsConfirmOpen, modifyProduct, createProduct });

      expect(modifyRequest).not.toHaveBeenCalled();
    });

    // id is undefined
    it('should not call any functions when id is undefined', () => {
      const setIsConfirmOpen = jest.fn();
      const productData = {};
      const process = "modify";
      const id = undefined;
      const modifyRequest = jest.fn();
      const modifyProduct = jest.fn();
      const createProduct = jest.fn();

      handleDraft({ productData, process, id, modifyRequest, setIsConfirmOpen, modifyProduct, createProduct });

      expect(modifyRequest).not.toHaveBeenCalled();
    });
});
