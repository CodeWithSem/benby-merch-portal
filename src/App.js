import React, { useState, useEffect } from "react";
import Layout from "./components/ADMINISTRATIVE/layout/Layout";
import { Toast_Provider } from "./components/ADMINISTRATIVE/layout/Toast_Provider";
import Login from "./components/AUTHENTICATION/Login";
import Sign_Up from "./components/AUTHENTICATION/Sign_Up";

function App() {
  const [page, set_page] = useState(() => {
    // ✅ If a user is stored, go straight to dashboard
    const stored_user = localStorage.getItem("user_data");
    if (stored_user) return "dashboard";
    return localStorage.getItem("page") || "login";
  });

  useEffect(() => {
    // ensure default page is set
    if (!localStorage.getItem("page")) {
      localStorage.setItem("page", "login");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);

  return (
    <Toast_Provider>
      {page === "login" && <Login set_page={set_page} />}
      {page === "sign_up" && <Sign_Up set_page={set_page} />}
      {page === "dashboard" && <Layout set_page={set_page} />}
    </Toast_Provider>
  );
}

export default App;
