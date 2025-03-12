import {
  Container,
  Paper,
  Text,
  Group,
  Button,
  Table,
  Badge,
  Menu,
  ActionIcon,
  Modal,
  Select,
  Divider,
  Stack,
  Checkbox,
  Tabs,
  TextInput,
} from "@mantine/core";
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

function HRPayrollHub() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>("processing");
  const [selectedPayrolls, setSelectedPayrolls] = useState<string[]>([]);
  const [currentPayroll, setCurrentPayroll] = useState<Payroll | null>(null);

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

  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "draft", label: "Draft" },
    { value: "processing", label: "Processing" },
    { value: "completed", label: "Completed" },
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
          <div className="p-3 space-y-6 mb-3">
            <Group>
              <h1 className="text-2xl font-bold">Payroll Administration</h1>
            </Group>
          </div>

          <Tabs value={activeTab} onChange={setActiveTab} className="mt-4">
            <Tabs.List>
              <Tabs.Tab value="processing" leftSection={<IconCoin size={20} />}>
                Pay Processing
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="processing" pt="sm">
              <Paper p="md" shadow="sm" className="mt-4 bg-gray-50">
                <Group>
                  <TextInput
                    placeholder="Search payrolls..."
                    className="flex-1"
                    leftSection={<IconSearch size={16} />}
                  />
                  <Select
                    data={statusOptions}
                    defaultValue="all"
                    leftSection={<IconFilter size={16} />}
                  />
                  <Button
                    variant="subtle"
                    disabled={selectedPayrolls.length === 0}
                    leftSection={<IconFileExport size={16} />}
                  >
                    Export Selected
                  </Button>
                  <Button
                    color="green"
                    disabled={selectedPayrolls.length === 0}
                  >
                    Process Selected
                  </Button>
                </Group>
              </Paper>

              <Paper p="lg" shadow="sm" className="mt-4">
                <Table verticalSpacing="sm">
                  <thead>
                    <tr className="border-b">
                      <th style={{ width: 40 }} className="text-center p-3">
                        <Checkbox
                          checked={selectedPayrolls.length === payrolls.length}
                          onChange={(e) =>
                            setSelectedPayrolls(
                              e.currentTarget.checked
                                ? payrolls.map((p) => p.id)
                                : []
                            )
                          }
                        />
                      </th>
                      <th className="text-left p-3">Pay Period</th>
                      <th className="text-center p-3">Status</th>
                      <th className="text-center p-3">Total Net</th>
                      <th className="text-center p-3">Employees</th>
                      <th className="text-center p-3">Processed Date</th>
                      <th className="text-center p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrolls.map((payroll) => (
                      <tr key={payroll.id}>
                        <td className="text-center p-3">
                          <Checkbox
                            checked={selectedPayrolls.includes(payroll.id)}
                            onChange={(e) =>
                              setSelectedPayrolls(
                                e.currentTarget.checked
                                  ? [...selectedPayrolls, payroll.id]
                                  : selectedPayrolls.filter(
                                      (id) => id !== payroll.id
                                    )
                              )
                            }
                          />
                        </td>

                        <td className="p-3">{payroll.period}</td>

                        <td className="text-center p-3">
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

                        <td className="text-center p-3">
                          ₱{payroll.totalNet.toLocaleString()}
                        </td>

                        <td className="text-center p-3">{payroll.employees}</td>

                        <td className="text-center p-3">
                          {payroll.processedAt}
                        </td>

                        <td className="text-center p-3">
                          <div className="flex justify-center gap-2">
                            <ActionIcon
                              onClick={() => setCurrentPayroll(payroll)}
                            >
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
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Paper>
            </Tabs.Panel>
          </Tabs>

          <Modal
            opened={!!currentPayroll}
            onClose={() => setCurrentPayroll(null)}
            size="lg"
            title={`Payroll Details - ${currentPayroll?.period}`}
          >
            {currentPayroll && (
              <Stack>
                <Text>
                  <strong>Status:</strong>{" "}
                  <Badge>{currentPayroll.status}</Badge>
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
      </main>
    </Container>
  );
}

export default HRPayrollHub;
