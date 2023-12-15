import { cleanObject } from "../../utils/cleanObject";



describe('cleanObject', () => {

  // Should return an empty object when passed an empty object
  it('should return an empty object when passed an empty object', () => {
    const obj = {};
    const result = cleanObject(obj);
    expect(result).toEqual({});
  });

  // Should return an object with all non-null, non-undefined, and non-empty string values
  it('should return an object with all non-null, non-undefined, and non-empty string values', () => {
    const obj = {
      name: "John",
      age: 25,
      email: "",
      address: null,
      phone: undefined
    };
    const result = cleanObject(obj);
    expect(result).toEqual({ name: "John", age: 25 });
  });

  // Should return an object with all non-null, non-undefined, and non-empty values of different types
  it('should return an object with all non-null, non-undefined, and non-empty values of different types', () => {
    const obj = {
      name: "John",
      age: 25,
      email: "",
      address: null,
      phone: undefined,
      isActive: true
    };
    const result = cleanObject(obj);
    expect(result).toEqual({ name: "John", age: 25, isActive: true });
  });
});
