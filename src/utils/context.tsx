import { createContext } from "react";

interface ContextProps {
  category?: any;
  setCategory?: (e: any) => void;
  selected?: { id: number; text: string; value?: string } | null;
  setSelected?: (e: any) => void;
  isChecker?: boolean;
  setIsChecker?: (e: any) => void;
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
}>({
  role: "",
  setRole: () => {},
  permissions: [],
  currencies: [],
  setCurrencies: () => {},
});

export const InvestmentContext = createContext<ContextProps>({
  category: null,
  setCategory: () => {},
  selected: null,
  setSelected: () => {},
  isChecker: true,
  setIsChecker: () => {},
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
