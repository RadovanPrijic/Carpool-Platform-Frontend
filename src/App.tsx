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
import EditUserPage from "./pages/EditUser";
import UserProfilePage from "./pages/UserProfile";
import EmailChangePage from "./pages/EmailChange";
import EmailConfirmationPage from "./pages/EmailConfirmation";
import PasswordConfirmationPage from "./pages/PasswordConfirmation";
import PasswordResetPage from "./pages/PasswordReset";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<HomePage />} loader={tokenLoader} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegistrationPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="logout" element={<LogoutPage />} />
          <Route path="edit-user" element={<EditUserPage />} />

          <Route path="user-profile" element={<UserProfilePage />} />
          <Route path="change-email" element={<EmailChangePage />} />
          <Route
            path="email-confirmation"
            element={<EmailConfirmationPage />}
          />
        </Route>

        <Route path="change-password" element={<PasswordResetPage />} />
        <Route path="password-reset" element={<PasswordConfirmationPage />} />
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
