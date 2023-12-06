import { Outlet } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import AuthGuard from "./AuthGuard";
import { AppContext } from "@app/utils/context";
import { auth$ } from "@Sterling/shared";

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
  const value = useMemo(
    () => ({
      role,
      setRole,
      permissions,
    }),
    [role, setRole, permissions]
  );
  useEffect(() => {
    auth$?.subscribe((value) => {
      setPermissions(
        value?.user?.user_permissions || [
          "CREATE_INVESTMENT_PRODUCT",
          "VIEW_ALL_INVESTMENT_PRODUCT_RECORDS",
          "VIEW_ALL_INVESTMENT_PRODUCT_REQUESTS",
          "RE_OR_DEACTIVATE_INVESTMENT_PRODUCT",
          "AUTHORIZE_INVESTMENT_PRODUCT_CREATION_OR_MODIFICATION_REQUESTS"
        ]
      );
      console.log(
        "🚀 ~ file: Layout.tsx:29 ~ auth$?.subscribe ~ value?.user?.user_permissions:",
        value?.user?.user_permissions
      );
      handleRole(setRole, value);
    });
  }, []);

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
