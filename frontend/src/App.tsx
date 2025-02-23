import { MantineProvider } from "@mantine/core";
import { useState } from "react";
import { Route, Routes } from "react-router";
import Login from "./pages/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <MantineProvider>
      <AppRoutes />
    </MantineProvider>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
