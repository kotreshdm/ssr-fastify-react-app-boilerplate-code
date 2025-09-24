// src/RouterProvider.jsx
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";
import ROUTES from "./constants/routes";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function AppRouter({
  isServer = false,
  initialEntries = ["/"],
}) {
  const Router = isServer ? MemoryRouter : BrowserRouter;

  return (
    <Router initialEntries={isServer ? initialEntries : undefined}>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
