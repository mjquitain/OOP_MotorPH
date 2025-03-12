import {
  Container,
  Group,
  Text,
  Button,
  Paper,
  Badge,
  Tabs,
  Select,
  Table,
} from "@mantine/core";
import { Link } from "react-router";
import {
  IconClockHour2,
  IconCoin,
  IconFileDownload,
  IconHome,
  IconLogout,
  IconMotorbike,
  IconReceipt,
  IconUser,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

function EmployeePayroll() {
  const [activeTab, setActiveTab] = useState<string | null>("payslips");
  const [selectedYear, setSelectedYear] = useState<string | null>("2025");
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const payslips = [
    {
      month: "March 2025",
      amount: "₱45,000",
      status: "Paid",
      date: "2025-03-15",
    },
    {
      month: "February 2025",
      amount: "₱45,000",
      status: "Paid",
      date: "2025-02-15",
    },
    {
      month: "January 2025",
      amount: "₱44,500",
      status: "Paid",
      date: "2025-01-15",
    },
  ];

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
              to: "/employee/dashboard",
              icon: <IconHome size={20} />,
              label: "Dashboard",
            },
            {
              to: "/employee/attendance",
              icon: <IconClockHour2 size={20} />,
              label: "Attendance",
            },
            {
              to: "/employee/payroll",
              icon: <IconReceipt size={20} />,
              label: "Payroll",
            },
            {
              to: "/employee/account",
              icon: <IconUser size={20} />,
              label: "Account",
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

      <main
        className={`transition-all duration-300 flex-1 p-6 bg-gray-50 h-screen overflow-auto ${
          isExpanded ? "ml-60" : "ml-20"
        }`}
      >
        <div className="p-3 max-w-6xl mx-auto">
          <div className="p-3 space-y-6 mb-3">
            <Group>
              <div className="flex flex-wrap justify-between items-center w-full">
                <h1 className="text-2xl font-bold">My Payroll</h1>
                <div className="p-3 flex flex-col items-center space-y-2">
                  <div className="mb-1">
                    <h1 className="flex justify-center">
                      {currentTime.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      <span className="ml-2 font-bold">
                        {currentTime.toLocaleTimeString()}
                      </span>
                    </h1>
                    <div className="flex justify-center">
                      <Text color="dimmed" className="mt-1">
                        Current Pay Period: March 1-31, 2025
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </Group>
          </div>

          <div className="p-3 space-y-6">
            <Paper p="lg" shadow="sm">
              <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List>
                  <Tabs.Tab value="payslips">
                    <div className="flex items-center gap-2">
                      <IconCoin size={20} />
                      Payslips
                    </div>
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="payslips" pt="sm">
                  <div className="flex gap-4 items-center p-3">
                    <h1 className="font-medium">Year</h1>
                    <Select
                      data={["2025", "2024", "2023"]}
                      value={selectedYear}
                      onChange={setSelectedYear}
                    />
                  </div>

                  <Table highlightOnHover>
                    <thead>
                      <tr className="border-b">
                        <th className="text-center p-3">Month</th>
                        <th className="text-center p-3">Amount</th>
                        <th className="text-center p-3">Payment Date</th>
                        <th className="text-center p-3">Status</th>
                        <th className="text-center p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payslips.map((payslip) => (
                        <tr key={payslip.month}>
                          <td className="text-center">{payslip.month}</td>
                          <td className="text-center p-3">{payslip.amount}</td>
                          <td className="text-center p-3">{payslip.date}</td>
                          <td className="text-center p-3">
                            <Badge
                              color={
                                payslip.status === "Paid" ? "green" : "yellow"
                              }
                            >
                              {payslip.status}
                            </Badge>
                          </td>
                          <td className="text-center">
                            <Button variant="subtle">
                              <IconFileDownload size={14} />
                              PDF
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Tabs.Panel>
              </Tabs>
            </Paper>
          </div>
        </div>
      </main>
    </Container>
  );
}

export default EmployeePayroll;
