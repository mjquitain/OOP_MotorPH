import {
  Badge,
  Button,
  Container,
  Group,
  Paper,
  Progress,
  Table,
  Title,
  Text,
  Tabs,
} from "@mantine/core";
import {
  IconBrandPaypal,
  IconCalendarEvent,
  IconCalendarPlus,
  IconChartBar,
  IconCheck,
  IconClockHour2,
  IconCopyCheck,
  IconDownload,
  IconFileAlert,
  IconFileInvoice,
  IconHome,
  IconLogout,
  IconMotorbike,
  IconReceipt,
  IconUser,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

function HRAttendance() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<string | null>("week");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const attendanceData = [
    { date: "2025-03-03", in: "08:02 AM", out: "05:15 PM", status: "present" },
    { date: "2025-03-04", in: "08:15 AM", out: "05:20 PM", status: "present" },
    { date: "2025-03-05", in: "--:-- --", out: "--:-- --", status: "absent" },
  ];

  const leaveBalances = [
    { type: "Vacation", used: 0, total: 15, color: "blue" },
    { type: "Sick", used: 0, total: 10, color: "green" },
    { type: "Emergency", used: 0, total: 5, color: "orange" },
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

      <main
        className={`transition-all duration-300 flex-1 p-6 bg-gray-50 h-screen overflow-auto ${
          isExpanded ? "ml-60" : "ml-20"
        }`}
      >
        <div className="p-3 max-w-6xl mx-auto">
          <div className="p-3 space-y-6">
            <Group>
              <div className="flex flex-wrap justify-between items-center w-full">
                <h1 className="text-2xl font-bold p-3">My Attendance</h1>
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
                  </div>
                  <div className="flex space-x-2 gap-3 items-center">
                    <Title order={4}>Current Status</Title>
                    <Badge
                      variant="filled"
                      size="xl"
                      color="green"
                      className="w-full gap-1"
                      leftSection={<IconCheck size={16} />}
                    >
                      <Text>Clocked In</Text>
                    </Badge>
                  </div>
                </div>
              </div>
            </Group>
          </div>

          <div className="p-3 space-y-6">
            <Paper p="md" shadow="sm" radius="md">
              <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List>
                  <Tabs.Tab value="week" leftSection={<IconChartBar size={20} />}>
                    Weekly Summary
                  </Tabs.Tab>
                  <Tabs.Tab value="month" leftSection={<IconCalendarEvent size={20} />}>
                    Monthly Overview
                  </Tabs.Tab>
                </Tabs.List>

                <div className="p-2">
                  <Tabs.Panel value="week" pt="sm">
                    <Text color="dimmed">Total Hours This Week</Text>
                    <Title order={2}>0h 0m</Title>
                    <Progress value={0} size="lg" color="cyan" />
                  </Tabs.Panel>

                  <Tabs.Panel value="month" pt="sm">
                    <Text color="dimmed">Projected Monthly Hours</Text>
                    <Title order={2}>0hr 00m</Title>
                    <Progress value={0} size="lg" color="orange" />
                  </Tabs.Panel>
                </div>
              </Tabs>

              <div className="p-2">
                <h1 className="font-bold text-xl mb-1">Leave Balances</h1>
                {leaveBalances.map((leave) => (
                  <div className="border-l-4 p-3 mb-3 font-medium text-lg">
                    <h1>{leave.type}</h1>
                    <h2 className="text-xs">
                      {leave.used}/{leave.total} days used
                    </h2>
                    <Progress
                      value={(leave.used / leave.total) * 100}
                      color={leave.color}
                      className="mt-2"
                    />
                  </div>
                ))}
              </div>

              <div className="p-2">
                <Button variant="outline" leftSection={<IconCalendarPlus size={18} />}>
                  Request Time Off
                </Button>
              </div>
            </Paper>
          </div>

          <div className="p-3">
            <Paper p="lg" shadow="sm">
              <Group className="mb-4">
                <div className="flex flex-wrap items-center w-full justify-between">
                  <Title order={3}>Attendance History</Title>
                  <Button variant="subtle" leftSection={<IconDownload size={18} />}>
                    Export CSV
                  </Button>
                </div>
              </Group>

              <Table highlightOnHover>
                <thead>
                  <tr className="border-b">
                    <th className="text-center p-3">Date</th>
                    <th className="text-center p-3">Clock In</th>
                    <th className="text-center p-3">Clock Out</th>
                    <th className="text-center p-3">Total Hours</th>
                    <th className="text-center p-3">Status</th>
                    <th className="text-center p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((record) => (
                    <tr key={record.date}>
                      <td className="text-center p-3">{record.date}</td>
                      <td className="text-center p-3">{record.in}</td>
                      <td className="text-center p-3">{record.out}</td>
                      <td className="text-center p-3">{record.status === "present" ? "7h 10m" : "--"}</td>
                      <td className="text-center p-3">
                        <Badge
                          color={record.status === "present" ? "green" : "red"}
                        >
                          {record.status}
                        </Badge>
                      </td>
                      <td className="text-center">
                        {record.status === "absent" && (
                          <Button variant="subtle" leftSection={<IconFileAlert />}>
                            Report Issue
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Paper>
          </div>
        </div>
      </main>
    </Container>
  );
}

export default HRAttendance;
