import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ClientsPage from "../pages/ClientsPage";
import SummaryPage from "../pages/SummaryPage";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <ClientsPage /> },
        { path: "/summary", element: <SummaryPage /> },
      ],
    },
  ]);