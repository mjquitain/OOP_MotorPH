import { Container } from "@mantine/core";
import {
  IconBrandPaypal,
  IconClockHour2,
  IconCopyCheck,
  IconFileInvoice,
  IconHome,
  IconLogout,
  IconMotorbike,
  IconReceipt,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router";

function HREmployeeManagement() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Container fluid className="flex h-screen bg-gray-50">
      <nav
        className={`fixed left-0 top-0 h-full bg-black text-white p-3 transition-all duration-300 ${
          isExpanded ? "w-60" : "w-20"
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="flex items-center gap-3">
          <IconMotorbike size={50} />
          {isExpanded && (
            <h2 className="text-xl font-bold">
              MOTORPH
              <p className="text-sm font-light">THE FILIPINO'S CHOICE</p>
            </h2>
          )}
        </div>

        <ul className="mt-4 space-y-2">
          {[
            {
              to: "/hr/dashboard",
              icon: <IconHome size={20} />,
              label: "Dashboard",
            },
            {
              to: "/hr/attendance",
              icon: <IconClockHour2 size={20} />,
              label: "Attendance",
            },
            {
              to: "/hr/payroll",
              icon: <IconReceipt size={20} />,
              label: "Payroll",
            },
            {
              to: "/hr/account",
              icon: <IconUser size={20} />,
              label: "Account",
            },
            {
              to: "/hr/employeemanagement",
              icon: <IconFileInvoice size={20} />,
              label: "Employee Management",
            },
            {
              to: "/hr/requests",
              icon: <IconCopyCheck size={20} />,
              label: "Requests",
            },
            {
              to: "/hr/payrollhub",
              icon: <IconBrandPaypal size={20} />,
              label: "Payroll Hub",
            },
          ].map(({ to, icon, label }) => (
            <li
              key={to}
              className="p-3 hover:bg-gray-700 rounded flex items-center"
            >
              <Link to={to} className="w-full flex items-center gap-3">
                {icon} {isExpanded && <span>{label}</span>}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="absolute inset-x-0 bottom-3 p-3">
          <li className="p-3 hover:bg-gray-700 rounded flex items-center">
            <Link to={"/"} className="w-full flex items-center gap-3">
              <IconLogout size={20} /> {isExpanded && <span>Logout</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </Container>
  );
}

export default HREmployeeManagement;
