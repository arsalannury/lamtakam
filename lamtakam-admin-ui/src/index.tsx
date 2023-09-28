import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SSRProvider from "react-bootstrap/SSRProvider";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import "bootstrap/dist/css/bootstrap.min.css";

const queryClient = new QueryClient();
const Provider: any = QueryClientProvider;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <SSRProvider>
      <Provider client={queryClient}>
        <App />
      </Provider>
    </SSRProvider>
  </BrowserRouter>
);
