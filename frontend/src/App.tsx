import { MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";

function App() {

  return (
    <MantineProvider>
      <AppRoutes />
    </MantineProvider>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="employeedashboard" element={<EmployeeDashboard />} />
    </Routes>
  );
}

export default App;
