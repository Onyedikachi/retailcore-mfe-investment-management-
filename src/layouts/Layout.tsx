import { Outlet } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import AuthGuard from "./AuthGuard";
import { AppContext } from "@app/utils/context";
import { auth$ } from "@Sterling/shared";
import { useGetCurrenciesQuery } from "@app/api";

export function handleRole(setRole, value) {
  if (value?.user?.is_superuser) {
    setRole("superadmin");
  } else {
    setRole("admin");
  }
}
const Layout = () => {
  const [permissions, setPermissions] = useState([]);
  const [role, setRole] = useState("default");
  const [currencies, setCurrencies] = useState<any[]>([]);
  const value = useMemo(
    () => ({
      role,
      setRole,
      permissions,
      currencies,
      setCurrencies,
    }),

    [role, setRole, permissions, currencies, setCurrencies]
  );
  useEffect(() => {
    auth$?.subscribe((value) => {
      setPermissions(value?.user?.user_permissions || []);

      handleRole(setRole, value);
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
