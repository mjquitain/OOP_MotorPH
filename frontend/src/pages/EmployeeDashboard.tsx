import {
  Button,
  Container,
  Title,
  Text,
  Grid,
  Paper,
  Group,
  Progress,
  Badge,
  Tabs,
  Timeline,
  useMantineTheme,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  IconBeach,
  IconCalendar,
  IconClockHour2,
  IconCoin,
  IconHome,
  IconLogout,
  IconReceipt,
  IconUser,
} from "@tabler/icons-react";

function EmployeeDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  
  const theme = useMantineTheme();

  return (
    <Container
      fluid
      className="flex h-screen w-screen overflow-hidden bg-gray-50"
    >
      <nav className="fixed left-0 top-0 h-full w-60 bg-black text-white p-3">
        <div>
          <Title order={1} size="h2" className="text-xl font-bold">
            MOTORPH
          </Title>
          <Title order={2} size="h6" className="text-sm">
            THE FILIPINO'S CHOICE
          </Title>
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
              <Title order={1} className="text-2xl font-bold p-3">
                Welcome,
              </Title>
              <div className="p-3 items-center">
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
                <Group>
                  <Button color="teal" size="md" w={123} h={36}>
                    Check In
                  </Button>
                  <Button
                    variant="outline"
                    color="red"
                    size="md"
                    w={123}
                    h={36}
                  >
                    Check Out
                  </Button>
                </Group>
              </div>
            </div>
          </Group>
        </div>

        <div className="p-3 space-y-6">
          <Grid gutter="xl">
            <Grid.Col span={4}>
              <Paper p="lg" shadow="sm" radius="md" className="h-full">
                <Group>
                  <div>
                    <Text color="dimmed" size="sm">
                      Attendance Summary
                    </Text>
                    <Title order={3} className="mt-1">
                      12 / 14 Days
                    </Title>
                    <Progress
                      value={85}
                      color="green"
                      size="sm"
                      className="mt-3"
                    />
                  </div>
                  <IconCalendar size={40} color={theme.colors.blue[6]} />
                </Group>
                <Group className="mt-4">
                  <div>
                    <Text size="sm">Present</Text>
                    <Text>12 days</Text>
                  </div>
                  <div>
                    <Text size="sm">Absent</Text>
                    <Text>2 days</Text>
                  </div>
                </Group>
              </Paper>
            </Grid.Col>

            <Grid.Col span={4}>
              <Paper p="lg" shadow="sm" radius="md" className="h-full">
                <Group>
                  <div>
                    <Text color="dimmed" size="sm">
                      Leave Balance
                    </Text>
                    <Title order={3} className="mt-1">
                      5 Days Remaining
                    </Title>
                  </div>
                  <IconBeach size={40} color={theme.colors.orange[6]} />
                </Group>
                <Button fullWidth className="mt-6">
                  Request Leave
                </Button>
              </Paper>
            </Grid.Col>

            <Grid.Col span={4}>
              <Paper p="lg" shadow="sm" radius="md" className="h-full">
                <Group>
                  <div>
                    <Text color="dimmed" size="sm">
                      Next Payslip
                    </Text>
                    <Title order={3} className="mt-1">
                      March 15, 2025
                    </Title>
                    <Text color="dimmed" size="sm" className="mt-1">
                      PHP 45,000
                    </Text>
                  </div>
                  <IconCoin size={40} color={theme.colors.green[6]} />
                </Group>
                <Button variant="outline" fullWidth className="mt-6">
                  Download Previous
                </Button>
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
                    <Text size="sm">New Marketing Basics course available</Text>
                    <Text size="xs" color="dimmed">
                      Posted 3 days ago
                    </Text>
                  </Timeline.Item>
                </Timeline>
              </Tabs.Panel>
            </Tabs>
          </Paper>
        </div>
      </main>
    </Container>
  );
}

export default EmployeeDashboard;
