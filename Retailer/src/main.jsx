import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import persistStore from "redux-persist/es/persistStore";

const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
