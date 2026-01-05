import React, { createContext, useContext, useEffect, useState } from "react";

const app_context = createContext();

export const App_Provider = ({ children }) => {
  const [active_user, set_active_user] = useState(() => {
    const stored_user = localStorage.getItem("active_user");
    return stored_user ? JSON.parse(stored_user) : null;
  });

  const [page, set_page] = useState(() => {
    const stored_page = localStorage.getItem("page");
    const stored_user = localStorage.getItem("active_user");
    if (stored_user && stored_page) return stored_page;
    if (stored_user) return "dashboard";
    return "login";
  });

  const [active_item, set_active_item] = useState(() => {
    return localStorage.getItem("active_item") || "Dashboard";
  });

  useEffect(() => {
    if (active_user) {
      localStorage.setItem("active_user", JSON.stringify(active_user));
      set_active_item("Dashboard");
      localStorage.setItem("active_item", "Dashboard");
    } else {
      localStorage.removeItem("active_user");
      localStorage.removeItem("active_item");
      set_page("login");
    }
  }, [active_user]);

  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);

  useEffect(() => {
    localStorage.setItem("active_item", active_item);
  }, [active_item]);

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
        active_item,
        set_active_item,
        ensure_logged_in,
      }}
    >
      {children}
    </app_context.Provider>
  );
};

export const Use_App = () => useContext(app_context);
