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
  IconReceipt,
  IconUser,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";

function EmployeeAttendance() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<string | null>("week");

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
    { type: "Vacation", used: 3, total: 15, color: "blue" },
    { type: "Sick", used: 1, total: 10, color: "green" },
    { type: "Emergency", used: 0, total: 5, color: "orange" },
  ];

  return (
    <Container
      fluid
      className="flex h-screen w-screen overflow-hidden bg-gray-50"
    >
      <nav className="fixed left-0 top-0 h-full w-60 bg-black text-white p-3">
        <div>
          <h2 className="text-xl font-bold">MOTORPH</h2>
          <p className="text-sm">THE FILIPINO'S CHOICE</p>
          <ul className="mt-4 list-none">
            <li className="p-3 hover:bg-gray-700 rounded flex items-center gap-3">
              <Link
                to="/employee/dashboard"
                className="hover:text-gray-300 flex items-center w-full h-full justify-start gap-3"
              >
                <IconHome size={20} />
                Dashboard
              </Link>
            </li>
            <li className="p-3 hover:bg-gray-700 rounded flex items-center gap-3">
              <Link
                to="/employee/attendance"
                className="hover:text-gray-300 flex items-center w-full h-full justify-start gap-3"
              >
                <IconClockHour2 size={20} />
                Attendance
              </Link>
            </li>
            <li className="p-3 hover:bg-gray-700 rounded flex items-center gap-3">
              <Link
                to="/employee/payroll"
                className="hover:text-gray-300 flex items-center w-full h-full justify-start gap-3"
              >
                <IconReceipt size={20} />
                Payroll
              </Link>
            </li>
            <li className="p-3 hover:bg-gray-700 rounded flex items-center gap-3">
              <Link
                to={"/employee/account"}
                className="hover:text-gray-300 flex items-center w-full h-full justify-start gap-3"
              >
                <IconUser size={20} />
                Account
              </Link>
            </li>
          </ul>

          <ul className="absolute inset-x-0 bottom-3 p-3 list-none">
            <li className="p-3 hover:bg-gray-700 rounded flex items-center gap-3">
              <Link
                to={"/"}
                className="hover:text-gray-300 flex items-center w-full h-full justify-start gap-3"
              >
                <IconLogout size={20} />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="ml-60 mr-0 items-center justify-center h-screen w-screen p-6 bg-gray-50 overflow-auto">
        <div className="p-3 space-y-6 mb-3">
          <Group>
            <div className="flex flex-wrap justify-between items-center w-full">
              <Title order={1} className="text-2xl font-bold">
                My Attendance
              </Title>
              <Text className="mt-1">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                <span className="ml-2 font-bold order-last">
                  {currentTime.toLocaleTimeString()}
                </span>
              </Text>
            </div>
          </Group>

          <Grid gutter="xl">
            <div>
              <Title order={4}>Current Status</Title>
              <Badge
                variant="filled"
                size="xl"
                color="green"
                className="w-full py-4"
              >
                <Group>
                  <IconCheck size={16} />
                  <Text>Clocked In</Text>
                </Group>
              </Badge>
            </div>

            <Grid.Col span={8}>
              <Paper p="lg" shadow="sm">
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

                  <Tabs.Panel value="week" pt="sm">
                    <Grid gutter="xl">
                      <Grid.Col span={6}>
                        <div>
                          <Text color="dimmed">Total Hours This Week</Text>
                          <Title order={2}>32h 15m</Title>
                          <Progress value={76} size="lg" color="cyan" />
                        </div>
                      </Grid.Col>
                    </Grid>
                  </Tabs.Panel>
                  <Tabs.Panel value="month" pt="sm">
                    <Grid gutter="xl">
                      <Grid.Col span={6}>
                        <div>
                          <Text color="dimmed">Projected Monthly Hours</Text>
                          <Title order={2}>100hrs 00m</Title>
                          <Progress value={65} size="lg" color="orange" />
                        </div>
                      </Grid.Col>
                    </Grid>
                  </Tabs.Panel>
                </Tabs>

                <div>
                  <Title order={4}>Leave Balances</Title>
                  <Grid gutter="md">
                    {leaveBalances.map((leave) => (
                      <Grid.Col span={4} key={leave.type}>
                        <Paper
                          p="md"
                          className="border-l-4"
                          >
                          <Text>{leave.type}</Text>
                          <Text size="sm">
                            {leave.used}/{leave.total} days used
                          </Text>
                          <Progress
                            value={(leave.used / leave.total) * 100}
                            color={leave.color}
                            className="mt-2"
                          />
                        </Paper>
                      </Grid.Col>
                    ))}
                  </Grid>
                  <Button variant="outline">
                    <IconCalendarPlus size={18} />
                    Request Time Off
                  </Button>
                </div>
              </Paper>
            </Grid.Col>
          </Grid>

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
        </div>
      </main>
    </Container>
  );
}

export default EmployeeAttendance;
