import { MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeAttendance from "./pages/EmployeeAttendance";
import EmployeePayroll from "./pages/EmployeePayroll";
import EmployeeAccount from "./pages/EmployeeAccount";
import HRDashboard from "./pages/HRDashboard";
import HRAttendance from "./pages/HRAttendance"
import HRPayroll from "./pages/HRPayroll";
import HRAccount from "./pages/HRAccount";
import HREmployeeManagement from "./pages/HREmployeeManagement";
import HRPayrollHub from "./pages/HRPayrollHub";
import HRRequests from "./pages/HRRequests";

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
      <Route path="/hr/dashboard" element={<HRDashboard />} />
      <Route path="/hr/attendance" element={<HRAttendance />} />
      <Route path="/hr/payroll" element={<HRPayroll />} />
      <Route path="/hr/account" element={<HRAccount />} />
      <Route path="/hr/employeemanagement" element={<HREmployeeManagement />} />
      <Route path="/hr/payrollhub" element={<HRPayrollHub />} />
      <Route path="/hr/requests" element={<HRRequests />} />
    </Routes>
  );
}

export default App;
