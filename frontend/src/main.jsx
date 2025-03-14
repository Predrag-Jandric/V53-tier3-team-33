import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ShoppingCartPage from "./components/ShoppingCartPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/shoppingCartPage" element={<ShoppingCartPage />} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>,
);
