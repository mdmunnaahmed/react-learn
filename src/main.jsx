import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import "./assets/css/app.css";
import "milligram/dist/milligram.min.css";

import { Provider } from "react-redux";
import store from "./app/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
