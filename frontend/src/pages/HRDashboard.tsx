import { Avatar, Button, Card, Container } from "@mantine/core";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  IconClockHour2,
  IconHome,
  IconLogout,
  IconReceipt,
  IconUser,
} from "@tabler/icons-react";

function HRDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);

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
      <nav className={`fixed left-0 top-0 h-full bg-black text-white p-3 transition-all duration-300 ${
          isExpanded ? "w-60" : "w-20"
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        >
        <div className={`transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0"}`}>
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

      <main className={`transition-all duration-300 flex-1 p-6 bg-gray-50 h-screen overflow-auto ${
          isExpanded ? "ml-60" : "ml-20"
        }`}
      >
        <div className="flex flex-wrap justify-between items-center w-full p-4">
          <h1 className="text-xl font-bold text-left">Welcome, </h1>
          <Avatar variant="transparent" radius="xs" size="md" src="" />
        </div>

        <div className="flex justify-center p-4 gap-5">
          <Card
            padding="lg"
            radius="md"
            className="text-center w-full max-w-md"
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
        </div>
      </main>
    </Container>
  );
}

export default HRDashboard;
