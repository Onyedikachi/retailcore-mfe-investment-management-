import { Outlet } from "react-router-dom";
import { useState, useMemo, useEffect, useRef } from "react";
import AuthGuard from "./AuthGuard";
import { AppContext } from "@app/utils/context";
import { auth$ } from "@Sterling/shared";
import { useGetCurrenciesQuery, useGetDefaultCurrencyQuery } from "@app/api";
import {
  RequiredInvestmentPermissions,
  RequiredInvestmentProductPermissions,
} from "@app/constants";

export function handleRole(setRole, value) {
  if (value?.user?.is_superuser) {
    setRole("superadmin");
  } else {
    setRole("admin");
  }
}

export const checkPermissions = ({
  value,
  setRole,
  setPermissions,
  userId,
  handleRole,
}) => {
  const userPermissions = value?.user?.user_permissions;

  const canProceed =
    userPermissions &&
    userPermissions.length &&
    RequiredInvestmentProductPermissions.some((item) =>
      userPermissions.includes(item)
    );
  const canProceedInvestment =
    userPermissions &&
    userPermissions.length &&
    RequiredInvestmentPermissions.some((item) =>
      userPermissions.includes(item)
    );

  if (
    userPermissions &&
    userPermissions.length &&
    window.location.href.includes("product-factory") &&
    !canProceed
  ) {
    window.location.href = "/";
  }
  if (
    userPermissions &&
    userPermissions.length &&
    window.location.href.includes("investment-management") &&
    !canProceedInvestment
  ) {
    window.location.href = "/";
  }
  setPermissions(userPermissions || []);

  userId.current = value?.user?.id;
  handleRole(setRole, value);
};

const Layout = () => {
  const [permissions, setPermissions] = useState([]);
  const [role, setRole] = useState("default");
  const [isChecker, setIsChecker] = useState(false);
  const [userData, setUserData] = useState(null);
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [defaultCurrency, setDefaultCurrency] = useState<any>("");

  const userId = useRef(null);
  const value = useMemo(
    () => ({
      role,
      setRole,
      permissions,
      currencies,
      defaultCurrency,
      setCurrencies,
      userId: userId.current,
      isChecker,
      setIsChecker,
      userData
    }),

    [
      role,
      setRole,
      permissions,
      currencies,
      defaultCurrency,
      setCurrencies,
      userId.current,
      isChecker,
      setIsChecker,
      userData
    ]
  );
  useEffect(() => {
    auth$?.subscribe((value) => {
      setUserData(value.user)
      checkPermissions({ value, setRole, setPermissions, userId, handleRole });
    });
  }, []);
  const { data: currencyData, isSuccess: currencyIsSuccess } =
    useGetCurrenciesQuery({ page_size: 1000 });
  // const { data: defaultCurrencyData, isSuccess: defaultCurrencyIsSuccess } =
  //   useGetDefaultCurrencyQuery();

  useEffect(() => {
    if (currencyIsSuccess) {
     
      setCurrencies(
        currencyData?.data?.results?.map((i) => {       
          return {
            id: i.id,
            text: i.abbreviation,
            value: i.id,
          };
        })
      );
      setDefaultCurrency(currencyData?.data?.results?.find(i=> i?.is_default))
    }
  }, [currencyIsSuccess]);

  return (
    <div data-testid="outlet">
      <AuthGuard>
        <AppContext.Provider value={value}>
          <Outlet />
        </AppContext.Provider>
      </AuthGuard>
    </div>
  );
};

export default Layout;
