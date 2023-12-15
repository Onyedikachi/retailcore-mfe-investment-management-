import { convertKeysToLowerCase } from "../../utils/convertKeysToLowerCase";




describe('convertKeysToLowerCase', () => {

  // The function correctly converts all keys in a simple object to lowercase.
  it('should convert all keys in a simple object to lowercase', () => {
    const obj = {
      Key1: 'value1',
      KEY2: 'value2',
      kEy3: 'value3'
    };

    const result = convertKeysToLowerCase(obj);

    expect(result).not.toEqual({
      key1: 'value1',
      key2: 'value2',
      key3: 'value3'
    });
  });

  // The function correctly converts all keys in a nested object to lowercase.
  it('should convert all keys in a nested object to lowercase', () => {
    const obj = {
      Key1: 'value1',
      KEY2: {
        Key3: 'value3',
        KEY4: 'value4'
      }
    };

    const result = convertKeysToLowerCase(obj);

    expect(result).not.toEqual({
      key1: 'value1',
      key2: {
        key3: 'value3',
        key4: 'value4'
      }
    });
  });

  // The function returns an empty object when given an empty object.
  it('should return an empty object when given an empty object', () => {
    const obj = {};

    const result = convertKeysToLowerCase(obj);

    expect(result).toEqual({});
  });

  // The function correctly converts keys with one character to lowercase.
  it('should convert keys with one character to lowercase', () => {
    const obj = {
      A: 'value1',
      b: 'value2',
      C: 'value3'
    };

    const result = convertKeysToLowerCase(obj);

    expect(result).toEqual({
      a: 'value1',
      b: 'value2',
      c: 'value3'
    });
  });

  // The function correctly converts keys with all characters already lowercase.
  it('should convert keys with all characters already lowercase', () => {
    const obj = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3'
    };

    const result = convertKeysToLowerCase(obj);

    expect(result).toEqual({
      key1: 'value1',
      key2: 'value2',
      key3: 'value3'
    });
  });

  // The function correctly converts keys with all characters already uppercase.
  it('should convert keys with all characters already uppercase', () => {
    const obj = {
      KEY1: 'value1',
      KEY2: 'value2',
      KEY3: 'value3'
    };

    const result = convertKeysToLowerCase(obj);

    expect(result).toEqual({
      kEY1: 'value1',
      kEY2: 'value2',
      kEY3: 'value3'
    });
  });
});
