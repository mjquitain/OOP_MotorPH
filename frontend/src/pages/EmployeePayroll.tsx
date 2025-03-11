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
  RingProgress,
  Tabs,
  Select,
  Table,
  List,
  ThemeIcon,
  TextInput,
} from "@mantine/core";
import { Link } from "react-router";
import {
  IconCalculator,
  IconClockHour2,
  IconCoin,
  IconDownload,
  IconFileDownload,
  IconHome,
  IconLogout,
  IconMotorbike,
  IconReceipt,
  IconReceiptTax,
  IconScale,
  IconUser,
  IconWallet,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

function EmployeePayroll() {
  const theme = useMantineTheme();
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

  const taxDocuments = [
    { name: "2316 Form 2024", type: "Annual Tax", date: "2025-01-31" },
    { name: "BIR 1700 2024", type: "Income Tax", date: "2024-04-15" },
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
        <div className="p-3 space-y-6 mb-3">
          <Group>
            <div className="flex flex-wrap justify-between items-center w-full">
              <div>
                <h1 className="text-2xl font-bold">My Payroll</h1>
                <Text color="dimmed" className="mt-1">
                  Current Pay Period: March 1-31, 2025
                </Text>
              </div>
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
              </div>
            </div>
          </Group>
        </div>

        <div className="p-3 space-y-6">
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
            
            <Grid.Col span={4}>
              <Paper p="lg" shadow="sm" className="h-full">
                <Group>
                  <div>
                    <Text color="dimmed" size="sm">
                      Tax Paid YTD
                    </Text>
                    <Title order={2} className="mt-1">
                      ₱27,100
                    </Title>
                    <Badge color="red" variant="light">
                      -5% from last year
                    </Badge>
                  </div>
                  <IconScale size={40} color={theme.colors.orange[6]} />
                </Group>
              </Paper>
            </Grid.Col>
          </Grid>
        </div>

        <div className="p-3 space-y-6">
          <Paper p="lg" shadow="sm">
            <Title order={3} className="mb-4">
              March 2025 Breakdown
            </Title>
            <Grid gutter="xl">
              <Grid.Col span={8}>
                <div>
                  <div className="flex justify-between">
                    <Text>Basic Salary</Text>
                    <Text>₱40,000</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text>Overtime Pay</Text>
                    <Text>₱2,500</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text>Allowances</Text>
                    <Text>₱2,500</Text>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <Text>Total Gross</Text>
                    <Text>₱45,000</Text>
                  </div>
                </div>
              </Grid.Col>

              <Grid.Col span={4}>
                <RingProgress
                  roundCaps
                  label={<Text>Deductions</Text>}
                  sections={[
                    { value: 35, color: "red", tooltip: "Taxes - ₱15,750" },
                    { value: 15, color: "orange", tooltip: "SSS - ₱6,750" },
                    {
                      value: 10,
                      color: "blue",
                      tooltip: "PhilHealth - ₱4,500",
                    },
                  ]}
                />
              </Grid.Col>
            </Grid>
          </Paper>

          <Paper p="lg" shadow="sm">
            <Tabs value={activeTab} onChange={setActiveTab}>
              <Tabs.List>
                <Tabs.Tab value="payslips">
                  <IconCoin size={14} />
                  Payslips
                </Tabs.Tab>
                <Tabs.Tab value="tax">
                  <IconReceiptTax size={14} />
                  Tax Documents
                </Tabs.Tab>
                <Tabs.Tab value="calculator">
                  <IconCalculator size={14} />
                  Tax Calculator
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="payslips" pt="sm">
                <div className="flex gap-4 mb-4">
                  <Select
                    label="Year"
                    data={["2025", "2024", "2023"]}
                    value={selectedYear}
                    onChange={setSelectedYear}
                  />
                  <Button variant="light">
                    <IconDownload size={14} />
                    Bulk Download
                  </Button>
                </div>

                <Table highlightOnHover>
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Amount</th>
                      <th>Payment Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payslips.map((payslip) => (
                      <tr key={payslip.month}>
                        <td>{payslip.month}</td>
                        <td>{payslip.amount}</td>
                        <td>{payslip.date}</td>
                        <td>
                          <Badge
                            color={
                              payslip.status === "Paid" ? "green" : "yellow"
                            }
                            variant="light"
                          >
                            {payslip.status}
                          </Badge>
                        </td>
                        <td>
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

              <Tabs.Panel value="tax" pt="sm">
                <List spacing="xs">
                  {taxDocuments.map((doc) => (
                    <List.Item
                      key={doc.name}
                      icon={
                        <ThemeIcon color="blue" size={24} radius="xl">
                          <IconReceiptTax size={12} />
                        </ThemeIcon>
                      }
                    >
                      <Group>
                        <div>
                          <Text>{doc.name}</Text>
                          <Text size="sm" color="dimmed">
                            {doc.type}
                          </Text>
                        </div>
                        <Button variant="subtle">
                          <IconDownload size={14} />
                          Download
                        </Button>
                      </Group>
                    </List.Item>
                  ))}
                </List>
              </Tabs.Panel>

              <Tabs.Panel value="calculator" pt="sm">
                <div className="max-w-md space-y-4">
                  <TextInput
                    label="Taxable Income"
                    placeholder="Enter amount"
                  />
                  <IconCoin size={14} />
                  <TextInput
                    label="Deductions"
                    placeholder="Enter deductions"
                  />
                  <IconScale size={14} />
                  <Button>
                    <IconCalculator size={14} />
                    Calculate Tax
                  </Button>
                  <Paper p="md" className="bg-gray-50">
                    <Text>Estimated Tax: ₱0.00</Text>
                    <Text size="sm" color="dimmed">
                      Based on current BIR rates
                    </Text>
                  </Paper>
                </div>
              </Tabs.Panel>
            </Tabs>
          </Paper>
        </div>
      </main>
    </Container>
  );
}

export default EmployeePayroll;
