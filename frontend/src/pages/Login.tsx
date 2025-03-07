import {
  Button,
  Card,
  Container,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router";

const mockUsers = [
  {
    id: 1,
    name: "Manuel III Garcia",
    email: "employee@motorph.com",
    password: "password123",
    role: "employee",
  },
  {
    id: 2,
    name: "Andrea Mae Villanueva",
    email: "hr@motorph.com",
    password: "password123",
    role: "hr",
  },
];

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "hr") {
        navigate("/hr/dashboard");
      } else {
        navigate("/employee/dashboard");
      }
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <Container w={"100%"} h={"100vh"} fluid bg="var(--mantine-color-gray-1)">
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <Card shadow="md" padding="xl" radius="md" className="w-96">
          <Title order={2} className="text-center mb-4">
            Login
          </Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" fullWidth>
              Sign In
            </Button>
          </form>
        </Card>
      </div>
    </Container>
  );
}

export default Login;
