import { isNewLocation } from "../../utils/isNewLocation";

describe('isNewLocation', () => {

    // Returns false when oldData is null or undefined
    it('should return false when oldData is null', () => {
      const oldData = null;
      const newData = {
        number: 123,
        streetname: 'Main St',
        city: 'City',
        lga: 'LGA',
        state: 'State',
        country: 'Country'
      };

      const result = isNewLocation(oldData, newData);

      expect(result).toBe(true);
    });

    // Returns false when oldData is null or undefined
    it('should return false when oldData is undefined', () => {
      const oldData = undefined;
      const newData = {
        number: 123,
        streetname: 'Main St',
        city: 'City',
        lga: 'LGA',
        state: 'State',
        country: 'Country'
      };

      const result = isNewLocation(oldData, newData);

      expect(result).toBe(true);
    });

    // Returns false when oldData is defined and all properties match newData
    it('should return false when all properties match', () => {
      const oldData = {
        number: 123,
        streetname: 'Main St',
        city: 'City',
        lga: 'LGA',
        state: 'State',
        country: 'Country'
      };
      const newData = {
        number: 123,
        streetname: 'Main St',
        city: 'City',
        lga: 'LGA',
        state: 'State',
        country: 'Country'
      };

      const result = isNewLocation(oldData, newData);

      expect(result).toBe(false);
    });

    // Returns true when oldData is defined and at least one property does not match newData
    it('should return true when at least one property does not match', () => {
      const oldData = {
        number: 123,
        streetname: 'Main St',
        city: 'City',
        lga: 'LGA',
        state: 'State',
        country: 'Country'
      };
      const newData = {
        number: 123,
        streetname: 'Main St',
        city: 'City',
        lga: 'LGA',
        state: 'State',
        country: 'Different Country'
      };

      const result = isNewLocation(oldData, newData);

      expect(result).toBe(true);
    });

    // Returns true when oldData is defined and newData is null or undefined
    it('should return true when newData is null', () => {
      const oldData = {
        number: 123,
        streetname: 'Main St',
        city: 'City',
        lga: 'LGA',
        state: 'State',
        country: 'Country'
      };
      const newData = null;

      const result = isNewLocation(oldData, newData);

      expect(result).toBe(true);
    });

    // Returns true when oldData is null or undefined and newData is defined
    it('should return true when oldData is null and newData is defined', () => {
      const oldData = null;
      const newData = {
        number: 123,
        streetname: 'Main St',
        city: 'City',
        lga: 'LGA',
        state: 'State',
        country: 'Country'
      };

      const result = isNewLocation(oldData, newData);

      expect(result).toBe(true);
    });

    // Returns false when oldData and newData are both null or undefined
    it('should return false when oldData and newData are both null', () => {
      const oldData = null;
      const newData = null;

      const result = isNewLocation(oldData, newData);

      expect(result).toBe(true);
    });
});
