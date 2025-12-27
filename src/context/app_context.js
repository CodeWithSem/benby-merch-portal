// src/context/app_context.js
import React, { createContext, useContext, useEffect, useState } from "react";

const app_context = createContext();

export const App_Provider = ({ children }) => {
  // -------------------------------
  // Initialize active_user
  // -------------------------------
  const [active_user, set_active_user] = useState(() => {
    const stored_user = localStorage.getItem("active_user");
    return stored_user ? JSON.parse(stored_user) : null;
  });

  // -------------------------------
  // Initialize page
  // -------------------------------
  const [page, set_page] = useState(() => {
    const stored_page = localStorage.getItem("page");
    const stored_user = localStorage.getItem("active_user");

    if (stored_user && stored_page) return stored_page; // persist last page if user exists
    if (stored_user) return "dashboard"; // fallback for logged-in user
    return "login"; // no user
  });

  // -------------------------------
  // Sync active_user with localStorage
  // -------------------------------
  useEffect(() => {
    if (active_user) {
      localStorage.setItem("active_user", JSON.stringify(active_user));
    } else {
      localStorage.removeItem("active_user");
      set_page("login"); // auto-redirect to login if no user
    }
  }, [active_user]);

  // -------------------------------
  // Sync page with localStorage
  // -------------------------------
  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);

  // -------------------------------
  // Optional: helper to ensure login
  // -------------------------------
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
        ensure_logged_in, // expose helper
      }}
    >
      {children}
    </app_context.Provider>
  );
};

// -------------------------------
// Custom hook to use context
// -------------------------------
export const Use_App = () => useContext(app_context);
