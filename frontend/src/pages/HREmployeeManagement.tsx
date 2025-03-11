import { Container, Modal, TextInput, Select, Table, ActionIcon, Menu, Divider, Badge, Checkbox, Group, Button, Paper, Title, Text, Avatar } from "@mantine/core";
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
  IconUserPlus,
  IconSearch,
  IconFilter,
  IconDots,
  IconEdit,
  IconTrash,
  IconListDetails,
  IconFileExport
} from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router";

interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  status: 'active' | 'onboarding' | 'offboarded';
  employmentType: 'full-time' | 'part-time' | 'contractor';
}

function HREmployeeManagement() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [addModalOpened, setAddModalOpened] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@motorph.com',
      position: 'Marketing Specialist',
      department: 'Marketing',
      status: 'active',
      employmentType: 'full-time'
    },
  ]);

  const departments = ['Marketing', 'Sales', 'Engineering', 'HR'];
  const employmentTypes = ['full-time', 'part-time', 'contractor'];

  const handleAddEmployee = (values: Employee) => {
    setEmployees([...employees, { ...values, id: Date.now().toString() }]);
    setAddModalOpened(false);
  };

  const handleEditEmployee = (values: Employee) => {
    setEmployees(employees.map(e => e.id === currentEmployee?.id ? values : e));
    setEditModalOpened(false);
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter(e => e.id !== id));
    setDeleteModalOpened(false);
  };

  const rows = employees.map((employee) => (
    <tr key={employee.id}>
      <td>
        <Checkbox
          value={employee.id}
          checked={selectedEmployees.includes(employee.id)}
          onChange={(e) => setSelectedEmployees(
            e.currentTarget.checked
              ? [...selectedEmployees, employee.id]
              : selectedEmployees.filter(id => id !== employee.id)
          )}
        />
      </td>
      <td>
        <Group>
          <Avatar size={30} radius="xl" />
          <div>
            <Text size="sm">{employee.name}</Text>
            <Text size="xs" color="dimmed">{employee.email}</Text>
          </div>
        </Group>
      </td>
      <td>{employee.position}</td>
      <td>
        <Badge 
          color={employee.status === 'active' ? 'green' : 'orange'}
          variant="light"
        >
          {employee.status}
        </Badge>
      </td>
      <td>{employee.department}</td>
      <td>
        <Text>{employee.employmentType}</Text>
      </td>
      <td>
        <Group>
          <ActionIcon onClick={() => {
            setCurrentEmployee(employee);
            setEditModalOpened(true);
          }}>
            <IconEdit size={16} />
          </ActionIcon>
          <Menu withinPortal position="bottom-end">
            <Menu.Target>
              <ActionIcon>
                <IconDots size={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>
              <IconListDetails size={14} />
                View Details
              </Menu.Item>
              <Menu.Item>
              <IconFileExport size={14} />
                Export Profile
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item 
                color="red"
                onClick={() => {
                  setCurrentEmployee(employee);
                  setDeleteModalOpened(true);
                }}
              >
                <IconTrash size={14} />
                Terminate
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
        <Modal
          opened={addModalOpened}
          onClose={() => setAddModalOpened(false)}
          title="Add New Employee"
        >
          <EmployeeForm 
            onSubmit={handleAddEmployee}
            departments={departments}
            employmentTypes={employmentTypes}
          />
        </Modal>

        <Modal
          opened={editModalOpened}
          onClose={() => setEditModalOpened(false)}
          title="Edit Employee"
        >
          {currentEmployee && (
            <EmployeeForm 
              initialValues={currentEmployee}
              onSubmit={handleEditEmployee}
              departments={departments}
              employmentTypes={employmentTypes}
            />
          )}
        </Modal>

        <Modal
          opened={deleteModalOpened}
          onClose={() => setDeleteModalOpened(false)}
          title="Confirm Termination"
        >
          <Text>Are you sure you want to terminate {currentEmployee?.name}?</Text>
          <Group mt="md">
            <Button variant="default" onClick={() => setDeleteModalOpened(false)}>
              Cancel
            </Button>
            <Button 
              color="red"
              onClick={() => currentEmployee && handleDeleteEmployee(currentEmployee.id)}
            >
              Confirm
            </Button>
          </Group>
        </Modal>

        <Group>
          <Title order={1}>Employee Management</Title>
          <Button 
            onClick={() => setAddModalOpened(true)}
          >
            <IconUserPlus size={18} />
            Add Employee
          </Button>
        </Group>

        <Paper p="md" shadow="sm" className="bg-gray-50 mt-4">
          <Group>
            <TextInput
              placeholder="Search employees..."
              className="flex-1"
            />
            <IconSearch size={16} />
            <Select
              placeholder="Filter by department"
              data={departments}
            />
            <IconFilter size={16} />
            <Button 
              variant="subtle"
              disabled={selectedEmployees.length === 0}
            >
              <IconFileExport size={16} />
              Export Selected
            </Button>
          </Group>
        </Paper>

        <Paper p="lg" shadow="sm" className="mt-4">
          <Table verticalSpacing="sm">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <Checkbox
                    onChange={(e) => 
                      setSelectedEmployees(e.currentTarget.checked 
                        ? employees.map(e => e.id) 
                        : [])
                    }
                  />
                </th>
                <th>Employee</th>
                <th>Position</th>
                <th>Status</th>
                <th>Department</th>
                <th>Employment Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>

          <Divider my="md" />

          <Group>
            <Text color="dimmed">
              Showing {employees.length} of {employees.length} employees
            </Text>
          </Group>
        </Paper>
      </div>
    </Container>
  );
}

function EmployeeForm({ 
  initialValues,
  onSubmit,
  departments,
  employmentTypes 
}: {
  initialValues?: Partial<Employee>;
  onSubmit: (values: Employee) => void;
  departments: string[];
  employmentTypes: string[];
}) {
  const [formValues, setFormValues] = useState<Partial<Employee>>(initialValues || {});

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(formValues as Employee);
    }}>
      <div className="space-y-4">
        <TextInput
          label="Full Name"
          required
          value={formValues.name || ''}
          onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
        />
        <TextInput
          label="Email"
          type="email"
          required
          value={formValues.email || ''}
          onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
        />
        <TextInput
          label="Position"
          required
          value={formValues.position || ''}
          onChange={(e) => setFormValues({ ...formValues, position: e.target.value })}
        />
        <Select
          label="Department"
          required
          data={departments}
          value={formValues.department}
          onChange={(value) => setFormValues({ ...formValues, department: value || '' })}
        />
        <Select
          label="Employment Type"
          required
          data={employmentTypes}
          value={formValues.employmentType}
          onChange={(value) => setFormValues({ ...formValues, employmentType: value as any })}
        />
        <Group mt="md">
          <Button type="submit">Save Employee</Button>
        </Group>
      </div>
    </form>
  );
}


export default HREmployeeManagement;
