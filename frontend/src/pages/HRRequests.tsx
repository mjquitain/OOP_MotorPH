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
  Divider,
  Stack,
  Avatar,
  Select,
  Grid,
  Progress,
  Checkbox,
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
  IconCheck,
  IconX,
  IconSearch,
  IconFilter,
  IconDots,
  IconFileExport,
  IconListDetails,
} from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router";

interface LeaveRequest {
  id: string;
  employee: {
    name: string;
    avatar: string;
    department: string;
  };
  type: "vacation" | "sick" | "emergency";
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "rejected";
  days: number;
  reason?: string;
}

function HRRequests() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>("all");
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [viewModalOpened, setViewModalOpened] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<LeaveRequest | null>(
    null
  );

  const [requests, setRequests] = useState<LeaveRequest[]>([
    {
      id: "1",
      employee: {
        name: "John Doe",
        avatar: "",
        department: "Marketing",
      },
      type: "vacation",
      startDate: "2024-03-15",
      endDate: "2024-03-20",
      status: "pending",
      days: 5,
      reason: "Family vacation",
    },
  ]);

  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ];

  const handleApprove = (id: string) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "approved" } : req
      )
    );
  };

  const handleReject = (id: string) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "rejected" } : req
      )
    );
  };

  const filteredRequests = requests.filter((req) =>
    selectedStatus === "all" ? true : req.status === selectedStatus
  );

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
              <h1 className="text-2xl font-bold">Leave Management</h1>
            </Group>
          </div>

          <Grid gutter="xl" className="mt-4">
            <Grid.Col span={4}>
              <Paper p="md" shadow="sm">
                <Text size="sm" color="dimmed">
                  Total Pending
                </Text>
                <Title order={2} className="mt-1">
                  {requests.filter((r) => r.status === "pending").length}
                </Title>
                <Progress
                  value={40}
                  color="yellow"
                  size="sm"
                  className="mt-2"
                />
              </Paper>
            </Grid.Col>
          </Grid>

          <Paper p="md" shadow="sm" className="mt-4 bg-gray-50">
            <Group>
              <TextInput
                placeholder="Search requests..."
                className="flex-1"
                leftSection={<IconSearch size={16} />}
              />
              <Select
                data={statusOptions}
                value={selectedStatus}
                onChange={setSelectedStatus}
                leftSection={<IconFilter size={16} />}
              />
              <Button
                variant="subtle"
                disabled={selectedRequests.length === 0}
                leftSection={<IconFileExport size={16} />}
              >
                Export Selected
              </Button>
            </Group>
          </Paper>

          <Paper p="lg" shadow="sm" className="mt-4">
            <div>
              <Table verticalSpacing="sm">
                <thead>
                  <tr className="border-b">
                    <th style={{ width: 40 }} className="text-center p-3">
                      <Checkbox
                        checked={
                          selectedRequests.length === filteredRequests.length
                        }
                        onChange={(e) =>
                          setSelectedRequests(
                            e.currentTarget.checked
                              ? filteredRequests.map((req) => req.id)
                              : []
                          )
                        }
                      />
                    </th>
                    <th className="text-left p-3">Employee</th>
                    <th className="text-center p-3">Type</th>
                    <th className="text-center p-3">Start Date</th>
                    <th className="text-center p-3">End Date</th>
                    <th className="text-center p-3">Duration</th>
                    <th className="text-center p-3">Status</th>
                    <th className="text-center p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request) => (
                    <tr key={request.id}>
                      <td className="text-center p-3">
                        <Checkbox
                          checked={selectedRequests.includes(request.id)}
                          onChange={(e) =>
                            setSelectedRequests(
                              e.currentTarget.checked
                                ? [...selectedRequests, request.id]
                                : selectedRequests.filter(
                                    (id) => id !== request.id
                                  )
                            )
                          }
                        />
                      </td>

                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={request.employee.avatar}
                            size={36}
                            radius="xl"
                          />
                          <div>
                            <Text size="sm" className="font-medium">
                              {request.employee.name}
                            </Text>
                            <Text size="xs" className="text-gray-500">
                              {request.employee.department}
                            </Text>
                          </div>
                        </div>
                      </td>

                      <td className="text-center p-3">
                        <Badge
                          color={
                            request.type === "vacation"
                              ? "blue"
                              : request.type === "sick"
                              ? "green"
                              : "red"
                          }
                          variant="light"
                        >
                          {request.type}
                        </Badge>
                      </td>

                      <td className="text-center p-3">{request.startDate}</td>
                      <td className="text-center p-3">{request.endDate}</td>

                      <td className="text-center p-3">{request.days} days</td>

                      <td className="text-center p-3">
                        <Badge
                          color={
                            request.status === "approved"
                              ? "green"
                              : request.status === "rejected"
                              ? "red"
                              : "yellow"
                          }
                          variant="light"
                        >
                          {request.status}
                        </Badge>
                      </td>

                      <td className="text-center p-3">
                        <div className="flex justify-center gap-2">
                          <ActionIcon
                            color="green"
                            onClick={() => handleApprove(request.id)}
                            disabled={request.status === "approved"}
                          >
                            <IconCheck size={16} />
                          </ActionIcon>
                          <ActionIcon
                            color="red"
                            onClick={() => handleReject(request.id)}
                            disabled={request.status === "rejected"}
                          >
                            <IconX size={16} />
                          </ActionIcon>
                          <Menu withinPortal position="bottom-end">
                            <Menu.Target>
                              <ActionIcon>
                                <IconDots size={16} />
                              </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                              <Menu.Item
                                onClick={() => {
                                  setCurrentRequest(request);
                                  setViewModalOpened(true);
                                }}
                              >
                                <IconListDetails size={14} />
                                View Details
                              </Menu.Item>
                              <Menu.Item>
                                <IconFileExport size={14} />
                                Export Request
                              </Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Paper>

          <Modal
            opened={viewModalOpened}
            onClose={() => setViewModalOpened(false)}
            title="Leave Request Details"
          >
            {currentRequest && (
              <Stack>
                <Text>
                  <strong>Employee:</strong> {currentRequest.employee.name}
                </Text>
                <Text>
                  <strong>Department:</strong>{" "}
                  {currentRequest.employee.department}
                </Text>
                <Text>
                  <strong>Type:</strong> <Badge>{currentRequest.type}</Badge>
                </Text>
                <Text>
                  <strong>Dates:</strong> {currentRequest.startDate} -{" "}
                  {currentRequest.endDate}
                </Text>
                <Text>
                  <strong>Duration:</strong> {currentRequest.days} days
                </Text>
                {currentRequest.reason && (
                  <>
                    <Divider />
                    <Text>
                      <strong>Reason:</strong>
                    </Text>
                    <Text>{currentRequest.reason}</Text>
                  </>
                )}
              </Stack>
            )}
          </Modal>
        </div>
      </main>
    </Container>
  );
}

export default HRRequests;
