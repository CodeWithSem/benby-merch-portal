// src/context/app_context.js
import React, { createContext, useContext, useEffect, useState } from "react";

const app_context = createContext();

export const App_Provider = ({ children }) => {
  const [active_user, set_active_user] = useState(() => {
    const stored_user = localStorage.getItem("active_user");
    return stored_user ? JSON.parse(stored_user) : null;
  });

  const [page, set_page] = useState(() => {
    const stored_user = localStorage.getItem("active_user");
    if (stored_user) return "dashboard";
    return localStorage.getItem("page") || "login";
  });

  // keep localStorage synced with user
  useEffect(() => {
    if (active_user) {
      localStorage.setItem("active_user", JSON.stringify(active_user));
    } else {
      localStorage.removeItem("active_user");
      set_page("login"); // 👈 auto-redirect to login if no user
    }
  }, [active_user]);

  // keep localStorage synced with page
  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);

  // Optional: function to check and redirect manually
  const ensure_logged_in = () => {
    if (!active_user) {
      set_page("login");
      return false;
    }
    return true;
  };

  return (
    <app_context.Provider
      value={{
        active_user,
        set_active_user,
        page,
        set_page,
        ensure_logged_in, // 👈 expose this helper
      }}
    >
      {children}
    </app_context.Provider>
  );
};

// custom hook
export const Use_App = () => useContext(app_context);
