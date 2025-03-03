import { Button, Card, Container, Title } from "@mantine/core";
import { useState, useEffect } from "react";

function EmployeeDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container w={"100%"} h={"100vh"} fluid>
      <div>
        <nav className="fixed left-0 top-0 h-full w-60 bg-gray-800 text-white p-3">
          <Title order={1} size="h2">
            MOTORPH
          </Title>
          <Title order={2} size={12}>
            THE FILIPINO'S CHOICE
          </Title>
          <ul>
            <li className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded">
              <a href="#" className="hover:text-gray-300">
                Dashboard
              </a>
            </li>
            <li className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded">
              <a href="#" className="hover:text-gray-300">
                Attendance
              </a>
            </li>
            <li className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded">
              <a href="#" className="hover:text-gray-300">
                Payroll
              </a>
            </li>
            <li className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded">
              <a href="#" className="hover:text-gray-300">
                Account
              </a>
            </li>
          </ul>

          <div className=" absolute inset-x-0 bottom-0 p-3">
            <li className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded">
              <a href="#" className="hover:text-gray-300">
                Logout
              </a>
            </li>
          </div>
        </nav>

        <div className="ml-60 mr-0 p-3 w-full">
          <div className="p-2 d-flex justify-content-center">
            <h1 className="text-xl font-bold text-left p-3">Welcome, </h1>
          </div>
        </div>

        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          className="w-80 text-center"
          bg={"var(--mantine-color-gray-4"}
          ml={270}
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
      </div>
    </Container>
  );
}

export default EmployeeDashboard;
