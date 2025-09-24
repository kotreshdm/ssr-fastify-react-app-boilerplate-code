import { Routes, Route } from "react-router-dom";
import Home from "../Home";
import Register from "../../pages/Register";
import Login from "../../pages/Login";
import Dashboard from "../../pages/Dashboard";
import ROUTES from "../../constants/routes";

// If Register uses client-only features, lazy-load it
const SafeRegister = Register;
// OR for client-only component (if SSR issues persist)
// const SafeRegister = dynamic(() => import("./pages/Register"), { ssr: false });

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.REGISTER} element={<SafeRegister />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
    </Routes>
  );
}
