import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter, RouteObject } from "react-router-dom";

import { ThemeProvider } from "./store/ThemeContext.tsx";

import { store } from "./store/Store";
import App from "./App.tsx";
import DetailPage from "./pages/DetailPage.tsx";
import PageContainer from "./components/PageContaner.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import "./index.css";

export const routes: RouteObject[] = [
  {
    path: "react2024",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "page/:pageId",
        element: <PageContainer />,
        children: [
          {
            path: "detail/:id",
            element: <DetailPage />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
