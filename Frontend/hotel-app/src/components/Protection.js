import React from "react";
import { Navigate } from "react-router-dom";

function Protection({ loginCheck, children }) {
  if (loginCheck === false) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default Protection;
