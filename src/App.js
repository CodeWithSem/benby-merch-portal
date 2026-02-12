// src/App.js
import React from "react";
import Layout from "./components/ADMINISTRATIVE/layout/Layout";
import { Toast_Provider } from "./components/ADMINISTRATIVE/layout/Toast_Provider";
import Login from "./components/AUTHENTICATION/Login";
import { App_Provider, Use_App } from "./context/app_context";
import { Use_ESC_Clear_Console } from "assets/scripts/functions/clear_console";
import Production_Layout from "components/PRODUCTION/layout/Production_Layout";
import Register from "components/AUTHENTICATION/Register";

const App_Content = () => {
  const { page, set_page } = Use_App();
  Use_ESC_Clear_Console();

  return (
    <Toast_Provider>
      {page === "login" && <Login set_page={set_page} />}
      {page === "register" && <Register set_page={set_page} />}
      {page === "dashboard" && <Layout set_page={set_page} />}
      {page === "production" && <Production_Layout set_page={set_page} />}
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
