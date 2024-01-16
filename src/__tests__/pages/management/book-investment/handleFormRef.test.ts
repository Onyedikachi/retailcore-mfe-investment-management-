import handleFormRef from "../../../../pages/management/book-investment/handleFormRef";
describe('handleFormRef', () => {

    // Sets the form reference to "customerInformation" when step is 1
    it('should set the form reference to "customerInformation" when step is 1', () => {
      const setFormRef = jest.fn();
      handleFormRef({ step: 1, setFormRef });
      expect(setFormRef).toHaveBeenCalledWith("customerInformation");
    });

    // Sets the form reference to "facilityDetails" when step is 2
    it('should set the form reference to "facilityDetails" when step is 2', () => {
      const setFormRef = jest.fn();
      handleFormRef({ step: 2, setFormRef });
      expect(setFormRef).toHaveBeenCalledWith("facilityDetails");
    });

    // Sets the form reference to "transactionSettings" when step is 3
    it('should set the form reference to "transactionSettings" when step is 3', () => {
      const setFormRef = jest.fn();
      handleFormRef({ step: 3, setFormRef });
      expect(setFormRef).toHaveBeenCalledWith("transactionSettings");
    });

    // step is null
    it('should set the form reference to "customerInformation" when step is null', () => {
      const setFormRef = jest.fn();
      handleFormRef({ step: null, setFormRef });
      expect(setFormRef).toHaveBeenCalledWith("customerInformation");
    });

    // step is undefined
    it('should set the form reference to "customerInformation" when step is undefined', () => {
      const setFormRef = jest.fn();
      handleFormRef({ step: undefined, setFormRef });
      expect(setFormRef).toHaveBeenCalledWith("customerInformation");
    });

    // step is not a number
    it('should set the form reference to "customerInformation" when step is not a number', () => {
      const setFormRef = jest.fn();
      handleFormRef({ step: "not a number", setFormRef });
      expect(setFormRef).toHaveBeenCalledWith("customerInformation");
    });
});