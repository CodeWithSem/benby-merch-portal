import React, { useState, useEffect } from "react";
import Layout from "./components/templates/layout/Layout";
import { Toast_Provider } from "./components/templates/layout/Toast_Provider";
import Login from "./components/templates/layout/Login";
import Sign_Up from "./components/templates/layout/Sign_Up";
import { onAuthStateChangedListener } from "./api/firebase_auth_api";

function App() {
  // const [page, set_page] = useState(null);

  const [page, set_page] = useState(() => {
    return localStorage.getItem("page") || "login";
  });

  useEffect(() => {
    if (!localStorage.getItem("page")) {
      localStorage.setItem("page", "login");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        set_page("dashboard");
      } else {
        set_page("login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null; // or a loading spinner

  return (
    <Toast_Provider>
      {page === "login" && <Login set_page={set_page} />}
      {page === "sign_up" && <Sign_Up set_page={set_page} />}
      {page === "dashboard" && <Layout />}
    </Toast_Provider>
  );
}

export default App;
