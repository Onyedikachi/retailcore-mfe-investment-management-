import handleFormRef from "../pages/investment/term-deposit/create-term-deposit/handleFormRef"


describe('handleFormRef', () => {

    // Sets the formRef to "productform" when step is 1
    it('should set the formRef to "productform" when step is 1', () => {
      const setFormRef = jest.fn();
      handleFormRef({ step: 1, setFormRef });
      expect(setFormRef).toHaveBeenCalledWith("productform");
    });

    // Sets the formRef to "customereligibilitycriteria" when step is 2
    it('should set the formRef to "customereligibilitycriteria" when step is 2', () => {
      const setFormRef = jest.fn();
      handleFormRef({ step: 2, setFormRef });
      expect(setFormRef).toHaveBeenCalledWith("customereligibilitycriteria");
    });

    // Sets the formRef to "pricingconfig" when step is 3
    it('should set the formRef to "pricingconfig" when step is 3', () => {
      const setFormRef = jest.fn();
      handleFormRef({ step: 3, setFormRef });
      expect(setFormRef).toHaveBeenCalledWith("pricingconfig");
    });

    // step is null
    it('should set the formRef to "productform" when step is null', () => {
      const setFormRef = jest.fn();
      handleFormRef({ step: null, setFormRef });
      expect(setFormRef).toHaveBeenCalledWith("productform");
    });

    // step is undefined
    it('should set the formRef to "productform" when step is undefined', () => {
      const setFormRef = jest.fn();
      handleFormRef({ step: undefined, setFormRef });
      expect(setFormRef).toHaveBeenCalledWith("productform");
    });

    // step is not a number
    it('should set the formRef to "productform" when step is not a number', () => {
      const setFormRef = jest.fn();
      handleFormRef({ step: "not a number", setFormRef });
      expect(setFormRef).toHaveBeenCalledWith("productform");
    });
});
