import { useEffect } from "react";
import { useGetPostProductsMutation } from "@app/api";

interface useProductListProps {
  query?: any;
}

const useProductList = ({ query }: useProductListProps) => {
  const [
    fetchProductsList,
    {
      data: fetchedProductsList,
      isSuccess: isGetProductsSuccess,
      isError,
      error,
      isLoading: isGetProductsLoading,
    },
  ] = useGetPostProductsMutation();

  useEffect(() => {
    if (query) {
      fetchProductsList(query);
    }
  }, [query?.filter_by]);

  return {
    fetchedProductsList,
   isGetProductsSuccess,
    // error: isError ? error : null,
    // loading: isGetProductsLoading,
  };
};

export default useProductList;
