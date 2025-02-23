import { Button, Container } from "@mantine/core";

function Login() {
  return (
    <Container w={"100%"} h={"100vh"} fluid>
      <h1>Login Page</h1>
      <div className="card">
        <Button>Button</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </Container>
  );
}

export default Login;
