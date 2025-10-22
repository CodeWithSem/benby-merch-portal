// src/App.js
import React from "react";
import Layout from "./components/ADMINISTRATIVE/layout/Layout";
import { Toast_Provider } from "./components/ADMINISTRATIVE/layout/Toast_Provider";
import Login from "./components/AUTHENTICATION/Login";
import Sign_Up from "./components/AUTHENTICATION/Sign_Up";
import { App_Provider, Use_App } from "./context/app_context";

const App_Content = () => {
  const { page, set_page } = Use_App();

  return (
    <Toast_Provider>
      {page === "login" && <Login set_page={set_page} />}
      {page === "sign_up" && <Sign_Up set_page={set_page} />}
      {page === "dashboard" && <Layout set_page={set_page} />}
    </Toast_Provider>
  );
};

function App() {
  return (
    <App_Provider>
      <App_Content />
    </App_Provider>
  );
}

export default App;
