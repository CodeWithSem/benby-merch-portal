// src/context/app_context.js
import React, { createContext, useContext, useEffect, useState } from "react";

const app_context = createContext();

export const App_Provider = ({ children }) => {
  // initialize user and page states
  const [active_user, set_active_user] = useState(() => {
    const stored_user = localStorage.getItem("active_user");
    return stored_user ? JSON.parse(stored_user) : null;
  });

  const [page, set_page] = useState(() => {
    const stored_user = localStorage.getItem("active_user");
    if (stored_user) return "dashboard";
    return localStorage.getItem("page") || "login";
  });

  // keep localStorage synced with state
  useEffect(() => {
    if (active_user) {
      localStorage.setItem("active_user", JSON.stringify(active_user));
    } else {
      localStorage.removeItem("active_user");
    }
  }, [active_user]);

  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);

  return (
    <app_context.Provider
      value={{
        active_user,
        set_active_user,
        page,
        set_page,
      }}
    >
      {children}
    </app_context.Provider>
  );
};

// custom hook for consuming context
export const Use_App = () => useContext(app_context);
