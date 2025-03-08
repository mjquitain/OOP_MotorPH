import {
  Container,
  Group,
  Title,
  Text,
  Button,
  Grid,
  Paper,
  Badge,
  useMantineTheme,
  Progress,
} from "@mantine/core";
import { Link } from "react-router";
import {
  IconClockHour2,
  IconCoin,
  IconFileDownload,
  IconHome,
  IconLogout,
  IconReceipt,
  IconScale,
  IconUser,
  IconWallet,
} from "@tabler/icons-react";

function EmployeePayroll() {
  const theme = useMantineTheme();

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
            <div>
              <Title order={1} className="text-2xl font-bold">
                My Payroll
              </Title>
              <Text color="dimmed" className="mt-1">
                Current Pay Period: March 1-31, 2025
              </Text>
            </div>
            <Button variant="outline">
              <IconFileDownload size={18} />
              Export History
            </Button>
          </Group>

          <Grid gutter="xl">
            <Grid.Col span={4}>
              <Paper p="lg" shadow="sm" className="h-full">
                <Group>
                  <div>
                    <Text color="dimmed" size="sm">
                      Net Pay This Month
                    </Text>
                    <Title order={2} className="mt-1">
                      ₱45,000
                    </Title>
                    <Badge color="green" variant="light">
                      +2.5% from last month
                    </Badge>
                  </div>
                  <IconWallet size={40} color={theme.colors.blue[6]} />
                </Group>
              </Paper>
            </Grid.Col>

            <Grid.Col span={4}>
              <Paper p="lg" shadow="sm" className="h-full">
                <Group>
                  <div>
                    <Text color="dimmed" size="sm">
                      YTD Earnings
                    </Text>
                    <Title order={2} className="mt-1">
                      ₱135,500
                    </Title>
                    <Progress
                      value={65}
                      color="cyan"
                      size="sm"
                      className="mt-2"
                    />
                  </div>
                  <IconCoin size={40} color={theme.colors.green[6]} />
                </Group>
              </Paper>
            </Grid.Col>
            <Paper p="lg" shadow="sm" className="h-full">
              <Group>
                <div>
                  <Text color="dimmed" size="sm">Tax Paid YTD</Text>
                  <Title order={2} className="mt-1">
                      ₱27,100
                    </Title>
                    <Badge color="red" variant="light">-5% from last year</Badge>
                </div>
                <IconScale size={40} color={theme.colors.orange[6]} />
              </Group>
            </Paper>
            <Grid.Col span={4}>

            </Grid.Col>
          </Grid>
        </div>
      </main>
    </Container>
  );
}

export default EmployeePayroll;
