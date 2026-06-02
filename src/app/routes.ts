import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./components/pages/Home";
import { Carta } from "./components/pages/Carta";
import { Reservas } from "./components/pages/Reservas";
import { Contactanos } from "./components/pages/Contactanos";
import { Cerveceria } from "./components/pages/Cerveceria";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "carta", Component: Carta },
      { path: "reservas", Component: Reservas },
      { path: "contactanos", Component: Contactanos },
      { path: "cerveceria", Component: Cerveceria },
    ],
  },
]);
