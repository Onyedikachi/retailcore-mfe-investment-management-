import { checkDocuments } from "../../utils/checkDocunent"

describe('checkDocuments', () => {

    // Returns an object with 'hasAllDocuments' property as true when all documents are present in the object
    it('should return an object with \'hasAllDocuments\' property as true when all documents are present in the object', () => {
        const keys = ['document1', 'document2'];
        const obj = {
            document1: 'content1',
            document2: 'content2'
        };

        const result = checkDocuments(keys, obj);
        console.log("res = ", result)
        expect(result.hasAllDocuments).toBe(true);
    });

    // Returns an object with 'hasAllDocuments' property as false when at least one document is missing from the object
    it('should return an object with \'hasAllDocuments\' property as false when at least one document is missing from the object', () => {
        const keys = ['document1', 'document2'];
        const obj = {
            document1: 'content1'
        };

        const result = checkDocuments(keys, obj);

        expect(result.hasAllDocuments).toBe(false);
    });

    // Returns an object with 'missingDocuments' property as an empty array when all documents are present in the object
    it('should return an object with \'missingDocuments\' property as an empty array when all documents are present in the object', () => {
        const keys = ['document1', 'document2'];
        const obj = {
            document1: 'content1',
            document2: 'content2'
        };

        const result = checkDocuments(keys, obj);

        expect(result.missingDocuments).toEqual([]);
    });

    // Returns undefined when the 'keys' parameter is undefined
    it('should return undefined when the \'keys\' parameter is undefined', () => {
        const keys = undefined;
        const obj = {
            document1: 'content1',
            document2: 'content2'
        };

        const result = checkDocuments(keys, obj);

        expect(result).toBeUndefined();
    });

    // Returns undefined when the 'obj' parameter is undefined
    it('should return undefined when the \'obj\' parameter is undefined', () => {
        const keys = ['document1', 'document2'];
        const obj = undefined;

        const result = checkDocuments(keys, obj);

        expect(result).toBeUndefined();
    });
});
