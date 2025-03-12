import {
  Grid,
  Paper,
  Title,
  Text,
  Group,
  Button,
  Progress,
  Badge,
  useMantineTheme,
  Container,
  Tabs,
  Timeline,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  IconUsers,
  IconBriefcase,
  IconCoin,
  IconChecklist,
  IconHome,
  IconClockHour2,
  IconReceipt,
  IconUser,
  IconLogout,
  IconCalendar,
  IconMotorbike,
  IconFileInvoice,
  IconCopyCheck,
  IconBrandPaypal,
} from "@tabler/icons-react";

function HRDashboard() {
  const theme = useMantineTheme();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
          <div className="p-3 space-y-3">
            <Group>
              <div className="flex flex-wrap justify-between items-center w-full">
                <h1 className="text-2xl font-bold">Welcome,</h1>
                <div>
                  <div className="mb-1">
                    <Text>
                      {currentTime.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      <span className="ml-2 font-bold">
                        {currentTime.toLocaleTimeString()}
                      </span>
                    </Text>
                  </div>
                  <div className="flex space-x-2">
                    <Button color="teal" size="md" w={130} h={36}>
                      Check In
                    </Button>
                    <Button
                      variant="outline"
                      color="red"
                      size="md"
                      w={130}
                      h={36}
                      className="left-1"
                    >
                      Check Out
                    </Button>
                  </div>
                </div>
              </div>
            </Group>
          </div>

          <div className="p-3 space-y-6">
            <Grid gutter="xl">
              <Grid.Col span={3}>
                <Paper p="lg" shadow="sm" className="h-full">
                  <Group>
                    <div>
                      <Text color="dimmed" size="sm">
                        Total Employees
                      </Text>
                      <Title order={3} className="mt-1">
                        1,240
                      </Title>
                      <Badge color="green" variant="light">
                        +5% MoM
                      </Badge>
                    </div>
                    <IconUsers size={40} color={theme.colors.blue[6]} />
                  </Group>
                </Paper>
              </Grid.Col>

              <Grid.Col span={3}>
                <Paper p="lg" shadow="sm" className="h-full">
                  <Group>
                    <div>
                      <Text color="dimmed" size="sm">
                        Open Positions
                      </Text>
                      <Title order={3} className="mt-1">
                        15
                      </Title>
                      <Badge color="red" variant="light">
                        3 Urgent
                      </Badge>
                    </div>
                    <IconBriefcase size={40} color={theme.colors.red[6]} />
                  </Group>
                </Paper>
              </Grid.Col>

              <Grid.Col span={3}>
                <Paper p="lg" shadow="sm" className="h-full">
                  <Group>
                    <div>
                      <Text color="dimmed" size="sm">
                        Pending Approvals
                      </Text>
                      <Title order={3} className="mt-1">
                        23
                      </Title>
                      <Progress
                        value={65}
                        color="yellow"
                        size="sm"
                        className="mt-2"
                      />
                    </div>
                    <IconChecklist size={40} color={theme.colors.yellow[6]} />
                  </Group>
                </Paper>
              </Grid.Col>

              <Grid.Col span={3}>
                <Paper p="lg" shadow="sm" className="h-full">
                  <Group>
                    <div>
                      <Text color="dimmed" size="sm">
                        Payroll Due
                      </Text>
                      <Title order={3} className="mt-1">
                        ₱5.2M
                      </Title>
                      <Text size="sm" color="dimmed">
                        Next: Mar 25
                      </Text>
                    </div>
                    <IconCoin size={40} color={theme.colors.green[6]} />
                  </Group>
                </Paper>
              </Grid.Col>
            </Grid>
          </div>

          <div className="p-3 mt-3">
            <Paper p="lg" shadow="sm" radius="md">
              <Group className="mb-4">
                <Title order={3}>Company Updates</Title>
                <Badge variant="filled" color="blue">
                  3 New
                </Badge>
              </Group>

              <Tabs defaultValue="announcements">
                <Tabs.List>
                  <Tabs.Tab value="announcements">Announcements</Tabs.Tab>
                  <Tabs.Tab value="policies">Policies</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="announcements" pt="sm">
                  <Timeline bulletSize={24} lineWidth={2}>
                    <Timeline.Item title="Payroll Processing">
                      <Text size="sm">
                        March 15th - Payroll will be processed
                      </Text>
                      <Text size="xs" color="dimmed">
                        Posted 2 days ago
                      </Text>
                    </Timeline.Item>

                    <Timeline.Item
                      bullet={<IconCalendar size={12} />}
                      title="Holiday Notice"
                    >
                      <Text size="sm">Office closed April 13 - April 20</Text>
                      <Text size="xs" color="dimmed">
                        Posted 1 week ago
                      </Text>
                    </Timeline.Item>

                    <Timeline.Item
                      bullet={<IconCoin size={12} />}
                      title="Training Opportunities"
                    >
                      <Text size="sm">
                        New Marketing Basics course available
                      </Text>
                      <Text size="xs" color="dimmed">
                        Posted 3 days ago
                      </Text>
                    </Timeline.Item>
                  </Timeline>
                </Tabs.Panel>
              </Tabs>
            </Paper>
          </div>
        </div>
      </main>
    </Container>
  );
}

export default HRDashboard;
