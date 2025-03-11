import {
  Container,
  Title,
  Text,
  Group,
  Badge,
  Grid,
  Paper,
  Tabs,
  Progress,
  Button,
  Table,
} from "@mantine/core";
import { Link } from "react-router";
import {
  IconCalendarEvent,
  IconCalendarPlus,
  IconChartBar,
  IconCheck,
  IconClockHour2,
  IconDownload,
  IconFileAlert,
  IconHome,
  IconLogout,
  IconMotorbike,
  IconReceipt,
  IconUser,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";

function EmployeeAttendance() {
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
        className={`transition-all duration-300 flex-1 p-4 bg-gray-50 h-screen overflow-auto ${
          isExpanded ? "ml-60" : "ml-20"
        }`}
      >
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
                    className="w-full"
                  >
                    <div className="flex items-center gap-2">
                      <IconCheck size={16} />
                      <Text>Clocked In</Text>
                    </div>
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
                <Tabs.Tab value="week">
                  <IconChartBar size={14} />
                  Weekly Summary
                </Tabs.Tab>
                <Tabs.Tab value="month">
                  <IconCalendarEvent size={14} />
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
              <Button variant="outline">
                <IconCalendarPlus size={18} />
                Request Time Off
              </Button>
            </div>
          </Paper>
        </div>

        <Paper p="lg" shadow="sm">
          <Group className="mb-4">
            <Title order={3}>Attendance History</Title>
            <Button variant="subtle">
              <IconDownload size={18} />
              Export CSV
            </Button>
          </Group>

          <Table highlightOnHover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Clock In</th>
                <th>Clock Out</th>
                <th>Total Hours</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record) => (
                <tr key={record.date}>
                  <td>{record.date}</td>
                  <td>{record.in}</td>
                  <td>{record.out}</td>
                  <td>{record.status === "present" ? "7h 10m" : "--"}</td>
                  <td>
                    <Badge
                      color={record.status === "present" ? "green" : "red"}
                    >
                      {record.status}
                    </Badge>
                  </td>
                  <td>
                    {record.status === "absent" && (
                      <Button variant="subtle">
                        <IconFileAlert />
                        Report Issue
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Paper>
      </main>
    </Container>
  );
}

export default EmployeeAttendance;
