import { Container } from "@mantine/core";
import { Link } from "react-router";

function EmployeeAttendance() {
  return (
    <Container fluid className="h-screen flex bg-gray-50">
      <nav className="fixed left-0 top-0 h-full w-60 bg-black text-white p-3">
        <div>
          <h2 className="text-xl font-bold">MOTORPH</h2>
          <p className="text-sm">THE FILIPINO'S CHOICE</p>
          <ul className="mt-4">
            <li className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded">
              <Link to="/employee/dashboard" className="hover:text-gray-300">
                Dashboard
              </Link>
            </li>
            <li className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded">
              <Link to="/employee/attendance" className="hover:text-gray-300">
                Attendance
              </Link>
            </li>
            <li className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded">
              <Link to="/employee/payroll" className="hover:text-gray-300">
                Payroll
              </Link>
            </li>
            <li className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded">
              <Link to={"/employee/account"} className="hover:text-gray-300">
                Account
              </Link>
            </li>
          </ul>

          <div className="absolute inset-x-0 bottom-0 p-3">
            <li className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded">
              <Link to={"/"} className="hover:text-gray-300">
                Logout
              </Link>
            </li>
          </div>
        </div>
      </nav>
    </Container>
  );
}

export default EmployeeAttendance;
