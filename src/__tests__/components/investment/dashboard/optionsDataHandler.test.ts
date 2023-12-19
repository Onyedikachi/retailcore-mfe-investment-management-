import optionsDataHandler from "../../../../components/investment/dashboard/optionsDataHandler"

describe('optionsDataHandler', () => {

    // Sets the query object with the productType_In property if label is "product type"
    it('should set the query object with the productType_In property when label is "product type"', () => {
      const query = {};
      const value = [];
      const label = "product type";
      const setQuery = jest.fn();

      optionsDataHandler({query, value, label, setQuery});

      expect(setQuery).toHaveBeenCalledWith({
        ...query,
        productType_In: value.length ? value.map((i) => i.value) : null,
      });
    });

    // Sets the query object with the requestType_In property if label is "type"
    it('should set the query object with the requestType_In property when label is "type"', () => {
      const query = {};
      const value = [];
      const label = "type";
      const setQuery = jest.fn();

      optionsDataHandler({query, value, label, setQuery});

      expect(setQuery).toHaveBeenCalledWith({
        ...query,
        requestType_In: value.length ? value.map((i) => i.value) : null,
      });
    });

    // Sets the query object with the initiator_In property if label is "initiator"
    it('should set the query object with the initiator_In property when label is "initiator"', () => {
      const query = {};
      const value = [];
      const label = "initiator";
      const setQuery = jest.fn();

      optionsDataHandler({query, value, label, setQuery});

      expect(setQuery).toHaveBeenCalledWith({
        ...query,
        initiator_In: value.length ? value.map((i) => i.value) : null,
      });
    });

    // label is not provided
    it('should not set any properties in the query object when label is not provided', () => {
      const query = {};
      const value = [];
      const label = undefined;
      const setQuery = jest.fn();

      optionsDataHandler({query, value, label, setQuery});

      expect(setQuery).not.toHaveBeenCalled();
    });

    // value is not provided
    it('should not set any properties in the query object when value is not provided', () => {
      const query = {};
      const value = [];
      const label = "product type";
      const setQuery = jest.fn();

      optionsDataHandler({query, value, label, setQuery});

      expect(setQuery).toHaveBeenCalledWith({"productType_In": null,});
    });

    // setQuery is not provided
    it('should not set any properties in the query object when setQuery is not provided', () => {
      const query = {};
      const value = [];
      const label = "product type";
      const setQuery = undefined;

      expect(() => {
        optionsDataHandler({query, value, label, setQuery});
      }).toThrow();
    });
});
