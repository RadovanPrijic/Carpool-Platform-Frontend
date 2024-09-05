import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import { tokenLoader } from "./utils/auth";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/api-config";
import RegistrationPage from "./pages/Registration";
import LogoutPage from "./pages/Logout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<HomePage />} loader={tokenLoader} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegistrationPage />} />
        <Route path="logout" element={<LogoutPage />} />
        //Protected routes
        <Route element={<ProtectedRoute />}></Route>
      </>
    )
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
