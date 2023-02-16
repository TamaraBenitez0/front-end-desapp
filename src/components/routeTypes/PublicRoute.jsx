import React from "react";
import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({ path, component }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const languaje=!!localStorage.getItem("languaje");

  if(!languaje) localStorage.setItem("languaje","en");
  if (isAuthenticated) return <Redirect to={"/quotations"} />;

  return <Route path={path} component={component} />;
};

export default PublicRoute;