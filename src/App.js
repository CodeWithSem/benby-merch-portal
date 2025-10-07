import React from "react";
import Layout from "./components/templates/layout/Layout";
import { Toast_Provider } from "./components/templates/layout/Toast_Provider";

function App() {
  return (
    <React.Fragment>
      <Toast_Provider>
        <Layout />
      </Toast_Provider>
    </React.Fragment>
  );
}

export default App;
