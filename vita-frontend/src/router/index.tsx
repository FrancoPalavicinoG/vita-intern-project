import { createBrowserRouter } from "react-router-dom";
import ClientsPage from "../pages/ClientsPage";
import SummaryPage from "../pages/SummaryPage";

export const router = createBrowserRouter([
    { path: "/", element: <ClientsPage /> },
    { path: "/summary", element: <SummaryPage /> }
]);