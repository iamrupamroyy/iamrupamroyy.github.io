import { createBrowserRouter } from "react-router";
import AppRoot from "./AppRoot";
import { SignalArchive } from "./components/SignalArchive";
import { Navbar } from "./components/Navbar";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRoot showWall={false} />,
  },
  {
    path: "/signals",
    element: (
      <>
        <Navbar />
        <SignalArchive />
      </>
    ),
  }
]);
