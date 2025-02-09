import { Route, Routes } from "react-router";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import PrivateRoute from "./components/PrivateRoute";
import GuestRoute from "./components/GuestRoute";

const App = () => {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        {/* Layout untuk keperluan login dan register */}
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
        </Route>
      </Route>
      <Route element={<PrivateRoute />}>
        {/* Layout untuk keperluan dashboard */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
