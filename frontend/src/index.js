import React from "react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Store from "./redux/store";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);

root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);

// ReactDOM.render(
//   <Provider store={Store}>
//     <App />
//   </Provider>,
//   document.getElementById("root")
// );

reportWebVitals();