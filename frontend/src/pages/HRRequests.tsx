import { Container, Paper, Title, Text, Group, Button, Table, 
  Badge, Menu, ActionIcon, Modal, Indicator, 
  Divider, Stack, Avatar, Select, Grid, Progress, 
  Checkbox,
  TextInput} from "@mantine/core";
  import {Calendar} from "@mantine/dates"
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
  IconCalendar, IconCheck, IconX, IconSearch, 
  IconFilter, IconDots, IconFileExport, IconListDetails 
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
  type: 'vacation' | 'sick' | 'emergency';
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  days: number;
  reason?: string;
}

function HRRequests() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>('all');
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [viewModalOpened, setViewModalOpened] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<LeaveRequest | null>(null);
  const [calendarModalOpened, setCalendarModalOpened] = useState(false);

  const [requests, setRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      employee: {
        name: 'John Doe',
        avatar: '',
        department: 'Marketing'
      },
      type: 'vacation',
      startDate: '2024-03-15',
      endDate: '2024-03-20',
      status: 'pending',
      days: 5,
      reason: 'Family vacation'
    },
  ]);

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
  ];

  const handleApprove = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'approved' } : req
    ));
  };

  const handleReject = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'rejected' } : req
    ));
  };

  const handleBulkApprove = () => {
    setRequests(requests.map(req => 
      selectedRequests.includes(req.id) ? { ...req, status: 'approved' } : req
    ));
    setSelectedRequests([]);
  };

  const filteredRequests = requests.filter(req => 
    selectedStatus === 'all' ? true : req.status === selectedStatus
  );

  const rows = filteredRequests.map((request) => (
    <tr key={request.id}>
      <td>
        <Checkbox
          checked={selectedRequests.includes(request.id)}
          onChange={(e) => setSelectedRequests(
            e.currentTarget.checked
              ? [...selectedRequests, request.id]
              : selectedRequests.filter(id => id !== request.id)
          )}
        />
      </td>
      <td>
        <Group>
          <Avatar src={request.employee.avatar} size={36} radius="xl" />
          <div>
            <Text size="sm">{request.employee.name}</Text>
            <Text size="xs" color="dimmed">{request.employee.department}</Text>
          </div>
        </Group>
      </td>
      <td>
        <Badge color={
          request.type === 'vacation' ? 'blue' : 
          request.type === 'sick' ? 'green' : 'red'
        }>
          {request.type}
        </Badge>
      </td>
      <td>{request.startDate}</td>
      <td>{request.endDate}</td>
      <td>{request.days} days</td>
      <td>
        <Badge 
          color={
            request.status === 'approved' ? 'green' :
            request.status === 'rejected' ? 'red' : 'yellow'
          }
          variant="light"
        >
          {request.status}
        </Badge>
      </td>
      <td>
        <Group>
          <ActionIcon
            color="green"
            onClick={() => handleApprove(request.id)}
            disabled={request.status === 'approved'}
          >
            <IconCheck size={16} />
          </ActionIcon>
          <ActionIcon
            color="red"
            onClick={() => handleReject(request.id)}
            disabled={request.status === 'rejected'}
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

      <div className={`flex-1 p-6 transition-all duration-300 ${
        isExpanded ? "ml-60" : "ml-20"
      }`}>
        <Group>
          <Title order={1}>Leave Management</Title>
          <Button 
            onClick={() => setCalendarModalOpened(true)}
          >
            <IconCalendar size={16} />
            Calendar View
          </Button>
        </Group>

        <Grid gutter="xl" className="mt-4">
          <Grid.Col span={4}>
            <Paper p="md" shadow="sm">
              <Text size="sm" color="dimmed">Total Pending</Text>
              <Title order={2} className="mt-1">{requests.filter(r => r.status === 'pending').length}</Title>
              <Progress value={40} color="yellow" size="sm" className="mt-2" />
            </Paper>
          </Grid.Col>
          <Grid.Col span={4}>
            <Paper p="md" shadow="sm">
              <Text size="sm" color="dimmed">Approval Rate</Text>
              <Title order={2} className="mt-1">78%</Title>
              <Progress value={78} color="green" size="sm" className="mt-2" />
            </Paper>
          </Grid.Col>
          <Grid.Col span={4}>
            <Paper p="md" shadow="sm">
              <Text size="sm" color="dimmed">Avg. Leave Days</Text>
              <Title order={2} className="mt-1">3.2</Title>
              <Progress value={65} color="blue" size="sm" className="mt-2" />
            </Paper>
          </Grid.Col>
        </Grid>

        <Paper p="md" shadow="sm" className="mt-4 bg-gray-50">
          <Group>
            <TextInput
              placeholder="Search requests..."
              className="flex-1"
            />
            <IconSearch size={16} />
            <Select
              data={statusOptions}
              value={selectedStatus}
              onChange={setSelectedStatus}
            />
            <IconFilter size={16} />
            <Button 
              variant="subtle"
              disabled={selectedRequests.length === 0}
            >
              <IconFileExport size={16} />
              Export Selected
            </Button>
            <Button
              color="green"
              onClick={handleBulkApprove}
              disabled={selectedRequests.length === 0}
            >
              Bulk Approve
            </Button>
          </Group>
        </Paper>

        <Paper p="lg" shadow="sm" className="mt-4">
          <Table verticalSpacing="sm">
            <thead>
              <tr>
                <th style={{ width: 40 }}></th>
                <th>Employee</th>
                <th>Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Paper>

        <Modal
          opened={calendarModalOpened}
          onClose={() => setCalendarModalOpened(false)}
          size="xl"
          title="Leave Calendar"
        >
          <Calendar
            renderDay={(date) => {
              const hasLeave = requests.some(req => 
                new Date(req.startDate) <= date && 
                new Date(req.endDate) >= date
              );
              
              return (
                <Indicator color="red" size={6} disabled={!hasLeave}>
                  <div>{date.getDate()}</div>
                </Indicator>
              );
            }}
          />
        </Modal>

        <Modal
          opened={viewModalOpened}
          onClose={() => setViewModalOpened(false)}
          title="Leave Request Details"
        >
          {currentRequest && (
            <Stack>
              <Text><strong>Employee:</strong> {currentRequest.employee.name}</Text>
              <Text><strong>Department:</strong> {currentRequest.employee.department}</Text>
              <Text><strong>Type:</strong> <Badge>{currentRequest.type}</Badge></Text>
              <Text><strong>Dates:</strong> {currentRequest.startDate} - {currentRequest.endDate}</Text>
              <Text><strong>Duration:</strong> {currentRequest.days} days</Text>
              {currentRequest.reason && (
                <>
                  <Divider />
                  <Text><strong>Reason:</strong></Text>
                  <Text>{currentRequest.reason}</Text>
                </>
              )}
            </Stack>
          )}
        </Modal>
      </div>
    </Container>
  );
}

export default HRRequests;
