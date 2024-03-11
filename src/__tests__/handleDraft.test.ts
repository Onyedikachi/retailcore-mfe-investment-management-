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

    it("should set modifyProduct if process == 'modify'", () => {
      const setIsConfirmOpen = jest.fn();
      const productData = {};
      const process = "modify";
      const id = "123";
      const modifyRequest = jest.fn();
      const modifyProduct = jest.fn();
      const createProduct = jest.fn();

      handleDraft({ productData, process, id, modifyRequest, setIsConfirmOpen, modifyProduct, createProduct });

      expect(setIsConfirmOpen).toHaveBeenCalledWith(false);
      expect(modifyProduct).toHaveBeenCalledWith({ ...productData, isDraft: true, id });
    })

    it("should set createProduct if process == 'create'", () => {
      const setIsConfirmOpen = jest.fn();
      const process = "create";
      const id = null;
      const modifyRequest = jest.fn();
      const productData = {id: id};
      const modifyProduct = jest.fn();
      const createProduct = jest.fn();
      
      handleDraft({ productData, process, id, modifyRequest, setIsConfirmOpen, modifyProduct, createProduct });
      
      expect(setIsConfirmOpen).toHaveBeenCalledWith(false);
      expect(createProduct).toHaveBeenCalledWith({ ...productData, isDraft: true, id });
    })
    
    it("should set createProduct if process == 'clone'", () => {
      const setIsConfirmOpen = jest.fn();
      const process = "clone";
      const id = null;
      const productData = {id: id};
      const modifyRequest = jest.fn();
      const modifyProduct = jest.fn();
      const createProduct = jest.fn();

      handleDraft({ productData, process, id, modifyRequest, setIsConfirmOpen, modifyProduct, createProduct });

      expect(setIsConfirmOpen).toHaveBeenCalledWith(false);
      expect(createProduct).toHaveBeenCalledWith({ ...productData, isDraft: true, id });
    })

    it("should set modifyProduct if process == 'continue'", () => {
      const setIsConfirmOpen = jest.fn();
      const process = "continue";
      const id = "123";
      const productData = {id: id};
      const modifyRequest = jest.fn();
      const modifyProduct = jest.fn();
      const createProduct = jest.fn();

      handleDraft({ productData, process, id, modifyRequest, setIsConfirmOpen, modifyProduct, createProduct });

      expect(setIsConfirmOpen).toHaveBeenCalledWith(false);
      expect(modifyRequest).toHaveBeenCalledWith({ ...productData, isDraft: true, id });
    })

    it("should set modifyProduct if process == 'withdraw_modify'", () => {
      const setIsConfirmOpen = jest.fn();
      const process = "withdraw_modify";
      const id = "123";
      const productData = {id: id};
      const modifyRequest = jest.fn();
      const modifyProduct = jest.fn();
      const createProduct = jest.fn();

      handleDraft({ productData, process, id, modifyRequest, setIsConfirmOpen, modifyProduct, createProduct });

      expect(setIsConfirmOpen).toHaveBeenCalledWith(false);
      expect(modifyRequest).toHaveBeenCalledWith({ ...productData, isDraft: true, id });
    })
});
