import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { store } from "../store/store.ts";
import { Provider } from "react-redux";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <Toaster />
          <App />
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
