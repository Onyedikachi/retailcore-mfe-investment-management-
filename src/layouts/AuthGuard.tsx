import { Navigate } from "react-router-dom";
import { isTokenValid } from "@Sterling/shared";
import React from "react";

interface IAuthGuardProps {
  children: React.JSX.Element;
}

const AuthGuard = ({ children }: IAuthGuardProps) => {
  const isAuthenticated = isTokenValid();

  return isAuthenticated ? (
    children
  ) : ( 
    <Navigate to="/login" state={{ expired: true }} />
  );
};

export default AuthGuard;
