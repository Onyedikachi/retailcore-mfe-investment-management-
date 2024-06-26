import { IndividualStatusTypes, IndividualTypeFilterOptions, ProductTypes, StatusFilterOptions, StatusTypes, TypeFilterOptions } from "@app/constants";
import { StatusCategoryType } from "@app/types";

export const handleProductDownloadSuccess = ({productDownloadIsSuccess, category, productDownloadData, isChecker, csvExporter, requestsDownloadIsSuccess, requestsDownloadData, handleDownload, type="product"}) => {

  if (
    productDownloadIsSuccess &&
    category === StatusCategoryType.AllProducts
  ) {
    handleDownload(
      productDownloadData?.results.map((i) => ({
        ...i,
        state: StatusTypes.find((n) => n.id === i.state)?.type,
        productType: ProductTypes.find((n) => n.id === i.productType)?.name,
      })),
      isChecker,
      csvExporter,
      category
    );
  }
  if (
    productDownloadIsSuccess &&
    category === StatusCategoryType?.Investments
  ) {
    handleDownload(
      productDownloadData?.results.map((i) => ({
        ...i,
        status: IndividualStatusTypes.find(
          (n) => n.id === i.investmentBookingStatus
        )?.type,
      })),
      isChecker,
      csvExporter,
      category
    );
  }

  if (requestsDownloadIsSuccess && category === StatusCategoryType.Requests) {
    handleDownload(
      requestsDownloadData?.results.map((i) => ({
        ...i,
        requestStatus: StatusFilterOptions.find(
          (n) => n.value === i.requestStatus
        )?.name,
        requestType: (type==="management"?IndividualTypeFilterOptions: TypeFilterOptions).find((n) => n.value === i.requestType)
          ?.name,
      })),
      isChecker,
      csvExporter,
      category
    );
  }
}