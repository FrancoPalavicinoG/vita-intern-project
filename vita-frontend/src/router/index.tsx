import { createBrowserRouter } from "react-router-dom";
import ClientsPage from "../pages/ClientsPage";

export const router = createBrowserRouter([
    { path: "/", element: <ClientsPage /> },
]);