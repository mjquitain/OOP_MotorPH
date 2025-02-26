import {Button, Card, Container, PasswordInput, TextInput, Title} from "@mantine/core";
import { useState } from "react";
//import { useNavigate } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const navigate = useNavigate;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Logging in with:", { email, password });
    //("/dashboard");
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
