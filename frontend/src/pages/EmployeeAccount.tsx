import {
  Grid,
  Paper,
  Title,
  Text,
  Group,
  Button,
  Avatar,
  Tabs,
  TextInput,
  PasswordInput,
  Divider,
  List,
  ThemeIcon,
  Alert,
  Switch,
  Container,
} from "@mantine/core";
import { Link } from "react-router";
import {
  IconUser,
  IconShieldLock,
  IconEmergencyBed,
  IconMail,
  IconPhone,
  IconMapPin,
  IconDeviceLaptop,
  IconTrash,
  IconCheck,
  IconPassword,
  IconLogout,
  IconInfoCircle,
  IconUserPlus,
  IconReceipt,
  IconClockHour2,
  IconHome,
  IconMotorbike,
  IconCake,
  IconIdBadge2,
  IconCalendarEvent,
  IconBuilding,
  IconUserPin,
  IconProgressCheck,
} from "@tabler/icons-react";
import { useState } from "react";

function EmployeeAccount() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>("profile");
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: "Jane Doe", relationship: "Spouse", phone: "+63 912 345 6789" },
  ]);

  const activeSessions = [
    { device: "Windows Chrome", location: "Manila", lastActive: "2 hours ago" },
    { device: "iPhone Safari", location: "Cebu", lastActive: "5 days ago" },
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
        <div className="p-3 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold">Account Settings</h1>

          <div>
            <Tabs value={activeTab} onChange={setActiveTab}>
              <Tabs.List>
                <Tabs.Tab value="profile">
                  <div className="flex items-center gap-2">
                    <IconUser size={20} />
                    Profile
                  </div>
                </Tabs.Tab>
                <Tabs.Tab value="security">
                  <div className="flex items-center gap-2">
                    <IconShieldLock size={20} />
                    Security
                  </div>
                </Tabs.Tab>
                <Tabs.Tab value="emergency">
                  <div className="flex items-center gap-2">
                    <IconEmergencyBed size={20} />
                    Emergency Contacts
                  </div>
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="profile" pt="sm">
                <Paper p="lg" shadow="sm" className="space-y-6">
                  <Group className="mb-6">
                    <Avatar src="/user-avatar.jpg" size={120} radius="xl" />
                    <div>
                      <Button variant="outline">
                        <IconUser size={16} />
                        Upload New Photo
                      </Button>
                      <Text color="dimmed" size="sm" className="mt-2">
                        JPG, PNG max 2MB
                      </Text>
                    </div>
                  </Group>

                  <Grid gutter="xl">
                    <Grid.Col span={6}>
                      <TextInput
                        label="First Name"
                        leftSection={<IconUser size={16} />}
                        value="John"
                      />
                      <TextInput
                        label="Personal Email"
                        value="john.doe@motorph.com"
                        className="mt-4"
                        leftSection={<IconMail size={16} />}
                      />
                      <TextInput
                        label="Address"
                        value="123 Main St, Manila"
                        className="mt-4"
                        leftSection={<IconMapPin size={16} />}
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <TextInput
                        label="Last Name"
                        leftSection={<IconUser size={16} />}
                        value="Doe"
                      />
                      <TextInput
                        label="Phone Number"
                        value="+63 912 345 6789"
                        className="mt-4"
                        leftSection={<IconPhone size={16} />}
                      />
                      <TextInput
                        label="Date of Birth"
                        value="Janury 1, 2000"
                        className="mt-4"
                        leftSection={<IconCake size={16} />}
                        disabled
                      />
                    </Grid.Col>
                  </Grid>

                  <Divider className="my-6" />

                  <Grid gutter="xl">
                    <Grid.Col span={6}>
                      <Title order={4} className="mb-2">
                        Employment Details
                      </Title>
                      <TextInput
                        label="Employee ID"
                        value="MPH-0245"
                        className="mt-2"
                        leftSection={<IconIdBadge2 size={16} />}
                        disabled
                      />
                      <TextInput
                        label="Date Hired"
                        value="January 15, 2023"
                        className="mt-4"
                        leftSection={<IconCalendarEvent size={16} />}
                        disabled
                      />
                      <TextInput
                        label="Department"
                        value="Marketing"
                        className="mt-4"
                        leftSection={<IconBuilding size={16} />}
                        disabled
                      />
                      <TextInput
                        label="Position"
                        value="Marketing Specialist"
                        className="mt-4"
                        leftSection={<IconUserPin size={16} />}
                        disabled
                      />
                    </Grid.Col>

                    <Grid.Col span={6}>
                      <TextInput
                        label="Status"
                        value="Active"
                        className="mt-8"
                        leftSection={<IconProgressCheck size={16} />}
                        disabled
                      />
                      <TextInput
                        label="Work Email"
                        value="employee@motorph.com"
                        className="mt-4"
                        leftSection={<IconMail size={16} />}
                        disabled
                      />
                      <TextInput
                        label="Work Number"
                        value="123-456-789"
                        className="mt-4"
                        leftSection={<IconPhone size={16} />}
                        disabled
                      />
                    </Grid.Col>
                  </Grid>
                </Paper>
              </Tabs.Panel>

              <Tabs.Panel value="security" pt="sm">
                <Paper p="lg" shadow="sm" className="space-y-6">
                  <div>
                    <Title order={4} className="mb-4">
                      Password Settings
                    </Title>
                    <PasswordInput
                      label="Current Password"
                      className="mb-4"
                      leftSection={<IconPassword size={16} />}
                    />
                    <PasswordInput
                      label="New Password"
                      className="mb-4"
                      leftSection={<IconPassword size={16} />}
                    />
                    <PasswordInput
                      label="Confirm New Password"
                      leftSection={<IconPassword size={16} />}
                    />
                    <Button
                      className="mt-4"
                      leftSection={<IconCheck size={16} />}
                    >
                      Change Password
                    </Button>
                  </div>

                  <Divider className="my-6" />

                  <div>
                    <Title order={4} className="mb-4">
                      Two-Factor Authentication
                    </Title>
                    <Group>
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <Text>2FA Status</Text>
                          <Text color="dimmed" size="sm">
                            Add an extra layer of security to your account
                          </Text>
                        </div>
                        <Switch label="Enable 2FA" />
                      </div>
                    </Group>
                  </div>

                  <Divider className="my-6" />

                  <div>
                    <Title order={4} className="mb-4">
                      Active Sessions
                    </Title>
                    <List spacing="xs">
                      {activeSessions.map((session, index) => (
                        <List.Item
                          key={index}
                          icon={
                            <ThemeIcon color="gray" size={24} radius="xl">
                              <IconDeviceLaptop size={12} />
                            </ThemeIcon>
                          }
                        >
                          <Group>
                            <div>
                              <Text>{session.device}</Text>
                              <Text size="sm" color="dimmed">
                                {session.location} • Last active{" "}
                                {session.lastActive}
                              </Text>
                            </div>
                            <Button
                              variant="subtle"
                              color="red"
                              leftSection={<IconLogout size={14} />}
                            >
                              Logout
                            </Button>
                          </Group>
                        </List.Item>
                      ))}
                    </List>
                  </div>
                </Paper>
              </Tabs.Panel>

              <Tabs.Panel value="emergency" pt="sm">
                <Paper p="lg" shadow="sm" className="space-y-4">
                  <Group className="mb-4">
                    <Title order={4}>Emergency Contacts</Title>
                    <Button leftSection={<IconUserPlus size={16} />}>
                      Add Contact
                    </Button>
                  </Group>

                  {emergencyContacts.map((contact, index) => (
                    <Paper
                      key={index}
                      p="md"
                      className="border-l-4 border-red-500"
                    >
                      <Group>
                        <div>
                          <Text>{contact.name}</Text>
                          <Text color="dimmed">{contact.relationship}</Text>
                          <Text>{contact.phone}</Text>
                        </div>
                        <Button
                          variant="subtle"
                          color="red"
                          leftSection={<IconTrash size={14} />}
                        >
                          Remove
                        </Button>
                      </Group>
                    </Paper>
                  ))}

                  {emergencyContacts.length === 0 && (
                    <Alert color="blue">
                      <IconInfoCircle size={16} />
                      No emergency contacts added yet
                    </Alert>
                  )}
                </Paper>
              </Tabs.Panel>
            </Tabs>
          </div>
        </div>
      </main>
    </Container>
  );
}

export default EmployeeAccount;
