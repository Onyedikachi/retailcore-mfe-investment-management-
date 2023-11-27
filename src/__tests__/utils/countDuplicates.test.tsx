import { countDuplicates } from "../../utils/countDuplicates";

describe('countDuplicates', () => {

  // Should return 0 when there are no duplicates in the array
  it('should return 0 when there are no duplicates in the array', () => {
      const array = [1, 2, 3, 4, 5];
      const result = countDuplicates(array);
      expect(result).toBe(0);
  });

  // Should return the correct number of duplicates when there are duplicates in the array
  it('should return the correct number of duplicates when there are duplicates in the array', () => {
      const array = [1, 2, 2, 3, 4, 4, 4];
      const result = countDuplicates(array);
      expect(result).toBe(2);
  });

  // Should handle arrays with multiple types of elements
  it('should handle arrays with multiple types of elements', () => {
      const array = [1, 'a', true, 'a', false, 1];
      const result = countDuplicates(array);
      expect(result).toBe(2);
  });

  // Should return 0 when the array is empty
  it('should return 0 when the array is empty', () => {
      const array = [];
      const result = countDuplicates(array);
      expect(result).toBe(0);
  });

  // Should handle arrays with only one element
  it('should handle arrays with only one element', () => {
      const array = [1];
      const result = countDuplicates(array);
      expect(result).toBe(0);
  });

  // Should handle arrays with only duplicate elements
  it('should handle arrays with only duplicate elements', () => {
      const array = [1, 1, 1, 1, 1];
      const result = countDuplicates(array);
      expect(result).toBe(1);
  });
});
