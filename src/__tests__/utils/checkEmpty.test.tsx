import { checkEmpty } from "../../utils/checkEmpty";

describe('checkEmpty', () => {

  // Returns an empty array if all objects in uploadData have all required properties
  it('should return an empty array when all objects have all required properties', () => {
    const uploadData = [
      {
        streetname: 'Street 1',
        number: 1,
        lga: 'LGA 1',
        city: 'City 1',
        state: 'State 1',
        country: 'Country 1',
      },
      {
        streetname: 'Street 2',
        number: 2,
        lga: 'LGA 2',
        city: 'City 2',
        state: 'State 2',
        country: 'Country 2',
      },
    ];

    const result = checkEmpty(uploadData);

    expect(result).toEqual([]);
  });

  // Returns an array with objects that have missing required properties
  it('should return an array with objects that have missing required properties', () => {
    const uploadData = [
      {
        streetname: 'Street 1',
        number: 1,
        lga: 'LGA 1',
        city: 'City 1',
        state: 'State 1',
      },
      {
        streetname: 'Street 2',
        number: 2,
        lga: 'LGA 2',
        city: 'City 2',
        state: 'State 2',
        country: 'Country 2',
      },
    ];

    const result = checkEmpty(uploadData);

    expect(result).toEqual([
      {
        streetname: 'Street 1',
        number: 1,
        lga: 'LGA 1',
        city: 'City 1',
        state: 'State 1',
      },
    ]);
  });

  // Returns an empty array if uploadData is empty
  it('should return an empty array when uploadData is empty', () => {
    const uploadData = [];

    const result = checkEmpty(uploadData);

    expect(result).toEqual([]);
  });

  // Returns an array with objects that have all required properties if uploadData contains only such objects
  it('should return an array with objects that have all required properties when uploadData contains only such objects', () => {
    const uploadData = [
      {
        streetname: 'Street 1',
        number: 1,
        lga: 'LGA 1',
        city: 'City 1',
        state: 'State 1',
        country: 'Country 1',
      },
      {
        streetname: 'Street 2',
        number: 2,
        lga: 'LGA 2',
        city: 'City 2',
        state: 'State 2',
        country: 'Country 2',
      },
    ];

    const result = checkEmpty(uploadData);

    expect(result).toEqual([]);
  });

  // Returns an array with objects that have missing required properties if uploadData contains only such objects
  it('should return an array with objects that have missing required properties when uploadData contains only such objects', () => {
    const uploadData = [
      {
        streetname: 'Street 1',
        number: 1,
        lga: 'LGA 1',
        city: 'City 1',
        state: 'State 1',
      },
      {
        streetname: 'Street 2',
        number: 2,
        lga: 'LGA 2',
        city: 'City 2',
        state: 'State 2',
      },
    ];

    const result = checkEmpty(uploadData);

    expect(result).toEqual(uploadData);
  });

  // Returns an array with objects that have missing required properties if uploadData contains objects with missing and objects with all required properties
  it('should return an array with objects that have missing required properties when uploadData contains objects with missing and objects with all required properties', () => {
    const uploadData = [
      {
        streetname: 'Street 1',
        number: 1,
        lga: 'LGA 1',
        city: 'City 1',
        state: 'State 1',
      },
      {
        streetname: 'Street 2',
        number: 2,
        lga: 'LGA 2',
        city: 'City 2',
        state: 'State 2',
        country: 'Country 2',
      },
    ];

    const result = checkEmpty(uploadData);

    expect(result).toEqual([
      {
        streetname: 'Street 1',
        number: 1,
        lga: 'LGA 1',
        city: 'City 1',
        state: 'State 1',
      },
    ]);
  });
});
