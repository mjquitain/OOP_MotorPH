import {
  Avatar,
  Button,
  Card,
  Container,
  Title,
  Tabs,
  Text,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  IconClockHour2,
  IconHome,
  IconLogout,
  IconReceipt,
  IconUser,
} from "@tabler/icons-react";

function EmployeeDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [announcements] = useState([
    {
      title: "Payroll will be processed on March 15th.",
      description: "Payroll is currently ongoing.",
    },
    {
      title: "Company holiday on March 25th!",
      description:
        "The office will be closed for the holidays from December 24 to January 1. Happy holidays, everyone!",
    },
    {
      title: "Training & Development Opportunities",
      description:
        "New Course Alert! Sign up for our marketing basics course starting next week to boost your knowledge and skills.",
    },
    {
      title: "New Hire Announcement",
      description:
        "Welcome Sarah, our new Marketing Specialist! Please join us in giving her a warm welcome to the team!",
    },
    {
      title: "Policy & Process Updates",
      description:
        "Starting next month, all leave requests must be submitted through the app. Please review the updated leave policy attached.",
    },
  ]);

  const [attendance] = useState({ present: 12, absent: 2 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
        <div className="flex flex-wrap justify-between items-center w-full p-3">
          <h1 className="text-xl font-bold text-left">Welcome, </h1>
          <Avatar variant="transparent" radius="xs" size="md" src="" />
        </div>
        <div className="flex flex-wrap justify-center w-full p-4 gap-28">
          <Card
            padding="lg"
            radius="md"
            className="text-center w-full max-w-md"
            bg={"var(--mantine-color-blue-2)"}
            style={{ width: "500px", height: "152px" }}
          >
            <div className="mt-0">
              <div className="text-xl">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="text-2xl font-bold mt-0">
                {currentTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-4">
              <Button color="green" radius="md" w={200}>
                Clock In
              </Button>
              <Button color="red" radius="md" w={200}>
                Clock Out
              </Button>
            </div>
          </Card>
          <Card
            padding="lg"
            radius="md"
            className="text-center w-full max-w-md"
            bg={"var(--mantine-color-blue-2)"}
            style={{ width: "500px", height: "152px" }}
          >
            <Title order={4} className="pb-3">
              📅 Attendance Summary
            </Title>
            <h1 className="p-2">✅ Present: {attendance.present} days</h1>
            <h1 className="pt-2">❌ Absent: {attendance.absent} days</h1>
          </Card>

          <Card
            padding="xl"
            radius="md"
            className="text-center w-full max-w-md"
            bg={"var(--mantine-color-blue-2)"}
            style={{ width: "500px", height: "152px" }}
          >
            <Title order={4} className="pb-3">
              📝 Leave Requests
            </Title>
            <li className="hover:bg-blue-100 rounded flex">
              <Link
                to="/employee/attendance"
                className="hover:text-gray-700 w-full h-full p-3"
              >
                Request Leave
              </Link>
            </li>
          </Card>
        </div>

        <div className="flex items-center w-auto p-3">
          <Card shadow="md" padding="md" radius="md" className="w-full">
            <Tabs defaultValue="announcements" className="w-full">
              <Tabs.List
                className="text-black rounded-t-lg"
                bg={"var(--mantine-color-blue-2)"}
              >
                <Tabs.Tab value="announcements" className="font-bold px-6">
                  Announcements
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="announcements">
                {announcements.map((item, index) => (
                  <div key={index} className="border-b border-gray-300 py-2 p-3">
                    <Text size="md">
                      {item.title}
                    </Text>
                    <Text size="sm" className="text-gray-600 italic">
                      {item.description}
                    </Text>
                  </div>
                ))}
              </Tabs.Panel>
            </Tabs>
          </Card>
        </div>
      </main>
    </Container>
  );
}

export default EmployeeDashboard;
