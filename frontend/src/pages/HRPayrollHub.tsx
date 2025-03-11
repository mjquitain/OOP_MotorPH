import {
  Container,
  Paper,
  Title,
  Text,
  Group,
  Button,
  Table,
  Badge,
  Menu,
  ActionIcon,
  Modal,
  Stepper,
  Select,
  Divider,
  Stack,
  Grid,
  Progress,
  Checkbox,
  Tabs,
  TextInput,
  RadioGroup,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
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
  IconCoin,
  IconFileExport,
  IconSearch,
  IconFilter,
  IconDots,
  IconListDetails,
  IconReport,
  IconCalculator,
  IconReceiptTax,
  IconHistory,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router";

interface Payroll {
  id: string;
  period: string;
  status: "draft" | "processing" | "completed" | "error";
  totalNet: number;
  totalTax: number;
  employees: number;
  processedAt: string;
}

interface EmployeePayroll {
  id: string;
  name: string;
  gross: number;
  deductions: number;
  net: number;
  status: "pending" | "paid";
  taxStatus: "compliant" | "review";
}

function HRPayrollHub() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>("processing");
  const [selectedPayrolls, setSelectedPayrolls] = useState<string[]>([]);
  const [processModalOpened, setProcessModalOpened] = useState(false);
  const [currentPayroll, setCurrentPayroll] = useState<Payroll | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const [payrolls, setPayrolls] = useState<Payroll[]>([
    {
      id: "1",
      period: "March 2024",
      status: "completed",
      totalNet: 2500000,
      totalTax: 450000,
      employees: 45,
      processedAt: "2024-03-25",
    },
  ]);

  const [employeePayrolls, setEmployeePayrolls] = useState<EmployeePayroll[]>([
    {
      id: "1",
      name: "John Doe",
      gross: 45000,
      deductions: 7500,
      net: 37500,
      status: "paid",
      taxStatus: "compliant",
    },
  ]);

  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "draft", label: "Draft" },
    { value: "processing", label: "Processing" },
    { value: "completed", label: "Completed" },
  ];

  const processSteps = [
    { title: "Data Validation", description: "Verify payroll data" },
    { title: "Approvals", description: "Manager confirmations" },
    { title: "Disbursement", description: "Execute payments" },
    { title: "Reporting", description: "Generate documents" },
  ];

  const handleProcessPayroll = () => {
    setProcessModalOpened(false);
  };

  const rows = payrolls.map((payroll) => (
    <tr key={payroll.id}>
      <td>
        <Checkbox
          checked={selectedPayrolls.includes(payroll.id)}
          onChange={(e) =>
            setSelectedPayrolls(
              e.currentTarget.checked
                ? [...selectedPayrolls, payroll.id]
                : selectedPayrolls.filter((id) => id !== payroll.id)
            )
          }
        />
      </td>
      <td>{payroll.period}</td>
      <td>
        <Badge
          color={
            payroll.status === "completed"
              ? "green"
              : payroll.status === "processing"
              ? "blue"
              : payroll.status === "draft"
              ? "yellow"
              : "red"
          }
          variant="light"
        >
          {payroll.status}
        </Badge>
      </td>
      <td>₱{payroll.totalNet.toLocaleString()}</td>
      <td>{payroll.employees}</td>
      <td>{payroll.processedAt}</td>
      <td>
        <Group>
          <ActionIcon onClick={() => setCurrentPayroll(payroll)}>
            <IconListDetails size={16} />
          </ActionIcon>
          <Menu withinPortal position="bottom-end">
            <Menu.Target>
              <ActionIcon>
                <IconDots size={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>
              <IconFileExport size={14} />
                Export Payslips
              </Menu.Item>
              <Menu.Item>
              <IconReport size={14} />
                Generate Report
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item color="red">
              <IconX size={14} />
                Cancel Payrun
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </td>
    </tr>
  ));

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
      <div
        className={`flex-1 p-6 transition-all duration-300 ${
          isExpanded ? "ml-60" : "ml-20"
        }`}
      >
        <Group>
          <Title order={1}>Payroll Administration</Title>
          <Button
            onClick={() => setProcessModalOpened(true)}
          >
            <IconCoin size={16} />
            New Payrun
          </Button>
        </Group>

        <Grid gutter="xl" className="mt-4">
          <Grid.Col span={4}>
            <Paper p="md" shadow="sm">
              <Text size="sm" color="dimmed">
                Total Payroll
              </Text>
              <Title order={2} className="mt-1">
                ₱
                {payrolls
                  .reduce((sum, p) => sum + p.totalNet, 0)
                  .toLocaleString()}
              </Title>
              <Progress value={75} color="blue" size="sm" className="mt-2" />
            </Paper>
          </Grid.Col>
          <Grid.Col span={4}>
            <Paper p="md" shadow="sm">
              <Text size="sm" color="dimmed">
                Avg. Net Pay
              </Text>
              <Title order={2} className="mt-1">
                ₱37,500
              </Title>
              <Progress value={65} color="green" size="sm" className="mt-2" />
            </Paper>
          </Grid.Col>
          <Grid.Col span={4}>
            <Paper p="md" shadow="sm">
              <Text size="sm" color="dimmed">
                Tax Liability
              </Text>
              <Title order={2} className="mt-1">
                ₱
                {payrolls
                  .reduce((sum, p) => sum + p.totalTax, 0)
                  .toLocaleString()}
              </Title>
              <Progress value={85} color="red" size="sm" className="mt-2" />
            </Paper>
          </Grid.Col>
        </Grid>

        <Tabs value={activeTab} onChange={setActiveTab} className="mt-4">
          <Tabs.List>
            <Tabs.Tab value="processing">
            <IconCoin size={14} />
              Pay Processing
            </Tabs.Tab>
            <Tabs.Tab value="history">
            <IconHistory size={14} />
              History
            </Tabs.Tab>
            <Tabs.Tab value="compliance">
            <IconReceiptTax size={14} />
              Tax Compliance
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="processing" pt="sm">
            <Paper p="md" shadow="sm" className="mt-4 bg-gray-50">
              <Group>
                <TextInput
                  placeholder="Search payrolls..."
                  className="flex-1"
                />
                <IconSearch size={16} />
                <Select
                  data={statusOptions}
                  defaultValue="all"
                />
                <IconFilter size={16} />
                <Button
                  variant="subtle"
                  disabled={selectedPayrolls.length === 0}
                >
                  <IconFileExport size={16} />
                  Export Selected
                </Button>
                <Button color="green" disabled={selectedPayrolls.length === 0}>
                  Process Selected
                </Button>
              </Group>
            </Paper>

            <Paper p="lg" shadow="sm" className="mt-4">
              <Table verticalSpacing="sm">
                <thead>
                  <tr>
                    <th style={{ width: 40 }}></th>
                    <th>Pay Period</th>
                    <th>Status</th>
                    <th>Total Net</th>
                    <th>Employees</th>
                    <th>Processed Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </Paper>
          </Tabs.Panel>

          <Tabs.Panel value="compliance" pt="sm">
            <Paper p="lg" shadow="sm" className="mt-4">
              <Title order={3} className="mb-4">
                Tax Deductions
              </Title>
              <Grid gutter="xl">
                <Grid.Col span={4}>
                  <Paper p="md" className="border-l-4 border-red-500">
                    <Text>SSS Contributions</Text>
                    <Text size="sm">
                      ₱
                      {payrolls
                        .reduce((sum, p) => sum + p.totalTax * 0.4, 0)
                        .toLocaleString()}
                    </Text>
                    <Progress value={80} color="red" className="mt-2" />
                  </Paper>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Paper p="md" className="border-l-4 border-blue-500">
                    <Text>PhilHealth</Text>
                    <Text size="sm">
                      ₱
                      {payrolls
                        .reduce((sum, p) => sum + p.totalTax * 0.3, 0)
                        .toLocaleString()}
                    </Text>
                    <Progress value={65} color="blue" className="mt-2" />
                  </Paper>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Paper p="md" className="border-l-4 border-green-500">
                    <Text>Pag-IBIG</Text>
                    <Text size="sm">
                      ₱
                      {payrolls
                        .reduce((sum, p) => sum + p.totalTax * 0.2, 0)
                        .toLocaleString()}
                    </Text>
                    <Progress value={90} color="green" className="mt-2" />
                  </Paper>
                </Grid.Col>
              </Grid>

              <Divider my="xl" />

              <RadioGroup>
                <Title order={4}>Pending Actions</Title>
                <Button>
                <IconCalculator size={16} />
                  File Quarterly Taxes
                </Button>
              </RadioGroup>

              <Table className="mt-4">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Tax Status</th>
                    <th>Gross Income</th>
                    <th>Tax Withheld</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employeePayrolls.map((emp) => (
                    <tr key={emp.id}>
                      <td>{emp.name}</td>
                      <td>
                        <Badge
                          color={
                            emp.taxStatus === "compliant" ? "green" : "red"
                          }
                        >
                          {emp.taxStatus}
                        </Badge>
                      </td>
                      <td>₱{emp.gross.toLocaleString()}</td>
                      <td>₱{(emp.gross * 0.15).toLocaleString()}</td>
                      <td>
                        <Button variant="subtle">
                          Adjust
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Paper>
          </Tabs.Panel>
        </Tabs>

        <Modal
          opened={processModalOpened}
          onClose={() => setProcessModalOpened(false)}
          size="xl"
          title="Process New Payroll"
        >
          <Stepper active={activeStep} onStepClick={setActiveStep}>
            {processSteps.map((step, index) => (
              <Stepper.Step
                key={index}
                label={step.title}
                description={step.description}
              />
            ))}
          </Stepper>

          <Divider my="xl" />

          <Grid gutter="xl">
            <Grid.Col span={6}>
              <Select
                label="Pay Period"
                data={["Monthly", "Bi-Monthly", "Special"]}
                defaultValue="Monthly"
              />
              <Calendar className="mt-4">Payment Date</Calendar>
            </Grid.Col>
          </Grid>

          <Group mt="xl">
            <Button onClick={handleProcessPayroll}>Start Processing</Button>
          </Group>
        </Modal>

        <Modal
          opened={!!currentPayroll}
          onClose={() => setCurrentPayroll(null)}
          size="lg"
          title={`Payroll Details - ${currentPayroll?.period}`}
        >
          {currentPayroll && (
            <Stack>
              <Text>
                <strong>Status:</strong> <Badge>{currentPayroll.status}</Badge>
              </Text>
              <Text>
                <strong>Total Net Pay:</strong> ₱
                {currentPayroll.totalNet.toLocaleString()}
              </Text>
              <Text>
                <strong>Total Tax:</strong> ₱
                {currentPayroll.totalTax.toLocaleString()}
              </Text>
              <Text>
                <strong>Employees:</strong> {currentPayroll.employees}
              </Text>
              <Text>
                <strong>Processed At:</strong> {currentPayroll.processedAt}
              </Text>
              <Divider />
              <Button>
                <IconFileExport size={16} />
                Export Full Report
              </Button>
            </Stack>
          )}
        </Modal>
      </div>
    </Container>
  );
}

export default HRPayrollHub;
