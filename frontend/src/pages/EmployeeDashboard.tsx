import { Button, Container, Title } from "@mantine/core";

function EmployeeDashboard() {
  return (
    <Container w={"100%"} h={"100vh"} fluid bg="var(--mantine-color-gray-9)">
      <div className="flex flex-col min-h-screen bg-black-100">
        <Title order={1} className="items-center justify-center">
          MotorPH Dashboard
        </Title>
        <p> Welcome to MotorPH Dashboard</p>
      </div>
      <div>
        <Button
          variant="transparent"
          color="rgba(255, 255, 255, 1)"
          justify="center"
        >
          <Button>Dashboard</Button>
          <Button>Attendance</Button>
          <Button>Payroll</Button>
          <Button>Personal Information</Button>
          <Button>Settings</Button>
          <Button>Logout</Button>
        </Button>
      </div>
    </Container>
  );
}

export default EmployeeDashboard;
