import { Outlet } from "react-router-dom";
import { useState, useMemo, useEffect, useRef } from "react";
import AuthGuard from "./AuthGuard";
import { AppContext } from "@app/utils/context";
import { auth$ } from "@Sterling/shared";
import { useGetCurrenciesQuery } from "@app/api";
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
  const [currencies, setCurrencies] = useState<any[]>([]);

  const userId = useRef(null);
  const value = useMemo(
    () => ({
      role,
      setRole,
      permissions,
      currencies,
      setCurrencies,
      userId: userId.current,
      isChecker,
      setIsChecker,
    }),

    [
      role,
      setRole,
      permissions,
      currencies,
      setCurrencies,
      userId.current,
      isChecker,
      setIsChecker,
    ]
  );
  useEffect(() => {
    auth$?.subscribe((value) => {
      checkPermissions({ value, setRole, setPermissions, userId, handleRole });
    });
  }, []);
  const {
    data: currencyData,
    isLoading: currencyLoading,
    isSuccess: currencyIsSuccess,
  } = useGetCurrenciesQuery({ page_size: 1000 });

  useEffect(() => {
    if (currencyIsSuccess) {
      setCurrencies(
        currencyData.results.map((i) => {
          return {
            id: i.id,
            text: i.abbreviation,
            value: i.id,
          };
        })
      );
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
