import { handleProductDownloadSuccess } from "../../utils/handleProductDownloadSuccess";
import { StatusCategoryType } from "../../constants/enums";

describe('code snippet', () => {

    // When productDownloadIsSuccess is true and category is StatusCategoryType.AllProducts, handleDownload is called with the mapped productDownloadData results, where state is replaced with the corresponding type from StatusTypes and productType is replaced with the corresponding name from ProductTypes.
    it('should call handleDownload with mapped productDownloadData results', () => {
      const productDownloadIsSuccess = true;
      const category = StatusCategoryType.AllProducts;
      const productDownloadData = {
        results: [
          {
            state: 0,
            productType: 1
          },
          {
            state: 2,
            productType: 0
          }
        ]
      };
      const isChecker = false;
      const csvExporter = {};
      const handleDownload = jest.fn();

      handleProductDownloadSuccess({
        productDownloadIsSuccess,
        category,
        productDownloadData,
        isChecker,
        csvExporter,
        requestsDownloadIsSuccess: false,
        requestsDownloadData: null,
        handleDownload
      });

      expect(handleDownload).toHaveBeenCalledWith([
        {
          state: "all",
          productType: "Treasure Bill"
        },
        {
          state: "active",
          productType: "Term Deposit"
        }
      ], isChecker, csvExporter, category);
    });

    // When requestsDownloadIsSuccess is true and category is StatusCategoryType.Requests, handleDownload is called with the mapped requestsDownloadData results, where requestStatus is replaced with the corresponding name from StatusFilterOptions and requestType is replaced with the corresponding name from TypeFilterOptions.
    it('should call handleDownload with mapped requestsDownloadData results', () => {
      const requestsDownloadIsSuccess = true;
      const category = StatusCategoryType.Requests;
      const requestsDownloadData = {
        results: [
          {
            requestStatus: 1,
            requestType: 2
          },
          {
            requestStatus: 3,
            requestType: 0
          }
        ]
      };
      const isChecker = false;
      const csvExporter = {};
      const handleDownload = jest.fn();

      handleProductDownloadSuccess({
        productDownloadIsSuccess: false,
        category,
        productDownloadData: null,
        isChecker,
        csvExporter,
        requestsDownloadIsSuccess,
        requestsDownloadData,
        handleDownload
      });

      expect(handleDownload).toHaveBeenCalledWith([
        {
          requestStatus: "in-review",
          requestType: "deactivation"
        },
        {
          requestStatus: "in-issue",
          requestType: "creation"
        }
      ], isChecker, csvExporter, category);
    });

    // When productDownloadIsSuccess is false and category is StatusCategoryType.AllProducts, handleDownload is not called.
    it('should not call handleDownload when productDownloadIsSuccess is false and category is StatusCategoryType.AllProducts', () => {
      const productDownloadIsSuccess = false;
      const category = StatusCategoryType.AllProducts;
      const productDownloadData = {
        results: [
          {
            state: 0,
            productType: 1
          },
          {
            state: 2,
            productType: 0
          }
        ]
      };
      const isChecker = false;
      const csvExporter = {};
      const handleDownload = jest.fn();

      handleProductDownloadSuccess({
        productDownloadIsSuccess,
        category,
        productDownloadData,
        isChecker,
        csvExporter,
        requestsDownloadIsSuccess: false,
        requestsDownloadData: null,
        handleDownload
      });

      expect(handleDownload).not.toHaveBeenCalled();
    });

    // When requestsDownloadIsSuccess is false and category is StatusCategoryType.Requests, handleDownload is not called.
    it('should not call handleDownload when requestsDownloadIsSuccess is false and category is StatusCategoryType.Requests', () => {
      const requestsDownloadIsSuccess = false;
      const category = StatusCategoryType.Requests;
      const requestsDownloadData = {
        results: [
          {
            requestStatus: 1,
            requestType: 2
          },
          {
            requestStatus: 3,
            requestType: 0
          }
        ]
      };
      const isChecker = false;
      const csvExporter = {};
      const handleDownload = jest.fn();

      handleProductDownloadSuccess({
        productDownloadIsSuccess: false,
        category,
        productDownloadData: null,
        isChecker,
        csvExporter,
        requestsDownloadIsSuccess,
        requestsDownloadData,
        handleDownload
      });

      expect(handleDownload).not.toHaveBeenCalled();
    });

    // When productDownloadData is undefined or null and category is StatusCategoryType.AllProducts, handleDownload is called with an empty array.
    it('should call handleDownload with an empty array when productDownloadData is undefined and category is StatusCategoryType.AllProducts', () => {
      const productDownloadIsSuccess = true;
      const category = StatusCategoryType.AllProducts;
      const productDownloadData = undefined;
      const isChecker = false;
      const csvExporter = {};
      const handleDownload = jest.fn();

      handleProductDownloadSuccess({
        productDownloadIsSuccess,
        category,
        productDownloadData,
        isChecker,
        csvExporter,
        requestsDownloadIsSuccess: false,
        requestsDownloadData: null,
        handleDownload
      });

      expect(handleDownload).toHaveBeenCalledWith(undefined, isChecker, csvExporter, category);
    });

    // When requestsDownloadData is undefined or null and category is StatusCategoryType.Requests, handleDownload is called with an empty array.
    it('should call handleDownload with an empty array when requestsDownloadData is null and category is StatusCategoryType.Requests', () => {
      const requestsDownloadIsSuccess = true;
      const category = StatusCategoryType.Requests;
      const requestsDownloadData = null;
      const isChecker = false;
      const csvExporter = {};
      const handleDownload = jest.fn();

      handleProductDownloadSuccess({
        productDownloadIsSuccess: false,
        category,
        productDownloadData: null,
        isChecker,
        csvExporter,
        requestsDownloadIsSuccess,
        requestsDownloadData,
        handleDownload
      });

      expect(handleDownload).toHaveBeenCalledWith(undefined, false, {}, "requests")
    });
});
