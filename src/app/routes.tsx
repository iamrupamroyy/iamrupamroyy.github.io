import { createBrowserRouter } from "react-router";
import AppRoot from "./AppRoot";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppRoot,
  },
]);
