import { Avatar, Button, Card, Container } from "@mantine/core";
import { useState, useEffect } from "react";
import { Link } from "react-router";

function EmployeeDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container fluid className="h-screen flex bg-gray-50">
      <nav className="fixed left-0 top-0 h-full w-60 bg-black text-white p-3">
        <div>
          <h2 className="text-xl font-bold">MOTORPH</h2>
          <p className="text-sm">THE FILIPINO'S CHOICE</p>
          <ul className="mt-4">
            <li className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded">
              <Link to="/employee/dashboard" className="hover:text-gray-300">
                Dashboard
              </Link>
            </li>
            <li className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded">
              <Link to="/employee/attendance" className="hover:text-gray-300">
                Attendance
              </Link>
            </li>
            <li className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded">
              <Link to="/employee/payroll" className="hover:text-gray-300">
                Payroll
              </Link>
            </li>
            <li className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded">
              <Link to={"/employee/account"} className="hover:text-gray-300">
                Account
              </Link>
            </li>
          </ul>

          <div className="absolute inset-x-0 bottom-0 p-3">
            <li className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded">
              <Link to={"/"} className="hover:text-gray-300">
                Logout
              </Link>
            </li>
          </div>
        </div>
      </nav>

      <main className="ml-60 mr-0 items-center justify-center h-screen w-screen p-6 bg-gray-50">
        <div className="flex justify-between items-center w-full p-4">
          <h1 className="text-xl font-bold text-left">Welcome, </h1>
          <Avatar variant="transparent" radius="xs" size="md" src="" />
        </div>

        <div className="flex items-center justify-between p-4 gap-5">
          <Card
            padding="lg"
            radius="md"
            className="text-center w-2xl"
            bg={"var(--mantine-color-black)"}
          >
            <div className="mt-0">
              <div className="text-xl text-white">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="text-2xl text-white font-bold mt-0">
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

          <div className="w-full">
            <div className="text-center text-white py-2 rounded-t-lg text-lg font-semibold bg-black">
              Time Worked
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 pb-4">
              <div className="flex flex-col items-center bg-gray-300 p-3 rounded-lg shadow">
                <p className="text-2xl font-bold">04:24</p>
                <p className="text-sm text-black">Today</p>
              </div>
              <div className="flex flex-col items-center bg-gray-300 p-3 rounded-lg shadow">
                <p className="text-2xl font-bold">20:30</p>
                <p className="text-sm text-black">This Week</p>
              </div>
              <div className="flex flex-col items-center bg-gray-300 p-3 rounded-lg shadow">
                <p className="text-2xl font-bold">20:30</p>
                <p className="text-sm text-black">This Month</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Container>
  );
}

export default EmployeeDashboard;
