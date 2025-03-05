import { MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeAttendance from "./pages/EmployeeAttendance";
import EmployeePayroll from "./pages/EmployeePayroll";
import EmployeeAccount from "./pages/EmployeeAccount";

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
      <Route path="/" element={<Login />} />
      <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
      <Route path="/employee/attendance" element={<EmployeeAttendance />} />
      <Route path="/employee/payroll" element={<EmployeePayroll />} />
      <Route path="/employee/account" element={<EmployeeAccount />} />
    </Routes>
  );
}

export default App;
