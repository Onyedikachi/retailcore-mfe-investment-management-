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
      setPermissions(value?.user?.user_permissions || []);

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
