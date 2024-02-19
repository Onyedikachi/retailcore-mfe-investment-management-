import { createContext, useContext } from "react";

interface ContextProps {
  specificCategory?: string;
  setSpecificCategory?: (e: any) => void;
  category?: any;
  setCategory?: (e: any) => void;
  selected?: { id: number; text: string; value?: string } | null;
  setSelected?: (e: any) => void;

  setStatus?: (e: any) => void;
  status?: string;
  dateData?: any;
  setDateData?: (e: any) => void;
  search?: string;
  setSearch?: (e: any) => void;
  type?: string;
  setType?: (e: any) => void;
  initiator?: string;
  setInitiator?: (e: any) => void;
  setDuration?: (e: any) => void;
  duration?: string;
  isRefreshing?: boolean;
  setRefreshing?: (e: boolean) => void;
  role?: string;
  setRole?: (e: string) => void;
  isDetailOpen?: boolean;
  setDetailOpen?: (e: any) => void;
  isIndividualDetailOpen?: boolean;
  setIndividualDetailOpen?: (e: any) => void;
  detail?: any;
  setDetail?: (e: any) => void;
}

interface branchDeactivationContextProps {
  stage: number;
  setStage: (e: number) => void;
}

interface ISummaryContextProps {
  // productsList: Array<any>;
  branch?: any;
  bulkProductData?: any;
  setBulkProductData?: (e: any) => void;
  requestData?: any;
  bulkQueryFetching?: boolean;
  formData?: any;
  uploadData?: any[];
}

export const AppContext = createContext<{
  role: string;
  setRole: (e) => void;
  permissions: string[];
  currencies?: any;
  setCurrencies?: (e: any) => void;
  userId?: string;
  isChecker?: boolean;
  setIsChecker?: (e: any) => void;
  defaultCurrency?: any;
}>({
  role: "",
  setRole: () => {},
  permissions: [],
  currencies: [],
  setCurrencies: () => {},
  userId: "",
  isChecker: true,
  setIsChecker: () => {},
  defaultCurrency: ""
});

export const CommonContext = createContext<ContextProps>({
  specificCategory: null,
  setSpecificCategory: () => {},
  category: null,
  setCategory: () => {},
  selected: null,
  setSelected: () => {},
  setStatus: () => {},
  status: "",
  dateData: null,
  setDateData: () => {},
  search: "",
  setSearch: () => {},
  type: "",
  setType: () => {},
  initiator: "",
  setInitiator: () => {},
  setDuration: () => {},
  duration: "",
  isRefreshing: false,
  setRefreshing: () => {},
  role: "",
  setRole: () => {},
  isDetailOpen: false,
  setDetailOpen: () => {},
  detail: false,
  setDetail: () => {},
});

export const InvestmentContext = CommonContext;

export const IndividualContext = CommonContext;
interface IOverviewContext {
  overviewTabStats: any;
  setOverviewTabStats: (e: any) => void;
  getStats: () => void;
}

export const OverviewContext = createContext<IOverviewContext>({
  overviewTabStats: null,
  setOverviewTabStats: () => {},
  getStats: () => {},
});



export const ProductDeactivationContext =
  createContext<branchDeactivationContextProps>({
    stage: null,
    setStage: () => {},
  });

export const SummaryContextProps = createContext<ISummaryContextProps>({
  branch: null,
  setBulkProductData: () => {},
  requestData: null,
  bulkQueryFetching: false,
  bulkProductData: null,
  formData: null,
  uploadData: [],
});

// export const defaultOverviewContext = {
//   name: "All Investments",
// };

export function useOverviewContext() {
  const overviewState = useContext(OverviewContext);
  if (overviewState === undefined) {
    throw new Error("useOverviewContext must be used with a dashbord context");
  }

  return overviewState;
}
