import React from "react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Store from "./redux/store";
import { createRoot } from "react-dom/client";
import FadeInWrapper from "./components/FadeInWrapper";

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);

root.render(
  <Provider store={Store}>
    <FadeInWrapper>
      <App />
    </FadeInWrapper>
  </Provider>
);

// ReactDOM.render(
//   <Provider store={Store}>
//     <App />
//   </Provider>,
//   document.getElementById("root")
// );

reportWebVitals();
