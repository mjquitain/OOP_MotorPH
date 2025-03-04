import { ActionIcon, Avatar, Button, Card, Container } from "@mantine/core";
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
    <Container fluid className="h-screen flex">
      <nav className="fixed left-0 top-0 h-full w-60 bg-gray-800 text-white p-3">
        <div>
          <h2 className="text-xl font-bold">MOTORPH</h2>
          <p className="text-sm">THE FILIPINO'S CHOICE</p>
          <ul className="mt-4">
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

          <div className="absolute inset-x-0 bottom-0 p-3">
            <li className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded">
              <a href="#" className="hover:text-gray-300">
                Logout
              </a>
            </li>
          </div>
        </div>
      </nav>

      <div className="ml-60 mr-0 p-3 w-auto h-auto">
        <div className="p-2 d-flex justify-content-center">
          <h1 className="text-xl font-bold text-left p-3">Welcome, </h1>
          <Avatar variant="transparent" radius="xs" size="md" src=""/>
        </div>
      </div>

      <main className="flex w-screen h-screen items-center justify-center">
        <Card
          padding="lg"
          radius="md"
          className="w-80 text-center"
          bg={"var(--mantine-color-gray-6)"}
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

        <div className="p-4 w-full">
          <div className="text-center py-2 rounded-t-lg text-lg font-semibold bg-gray-500">
            Time Worked
          </div>
          <div className="grid grid-cols-3 gap-4 shadow-md rounded-b-lg p-4">
            <div className="flex flex-col items-center border p-3 rounded-lg shadow">
              <p className="text-2xl font-bold">04:24</p>
              <p className="text-sm text-gray-500">Today</p>
            </div>
            <div className="flex flex-col items-center border p-3 rounded-lg shadow">
              <p className="text-2xl font-bold">20:30</p>
              <p className="text-sm text-gray-500">This Week</p>
            </div>
            <div className="flex flex-col items-center border p-3 rounded-lg shadow">
              <p className="text-2xl font-bold">20:30</p>
              <p className="text-sm text-gray-500">This Month</p>
            </div>
          </div>
        </div>
      </main>
    </Container>
  );
}

export default EmployeeDashboard;
