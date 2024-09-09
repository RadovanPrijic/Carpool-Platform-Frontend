import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./features/authentication/pages/Login";
import { tokenLoader } from "./utils/auth";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/api-config";
import RegistrationPage from "./features/authentication/pages/Registration";
import LogoutPage from "./features/authentication/pages/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import EditUserPage from "./features/users/pages/EditUser";
import UserProfilePage from "./features/users/pages/UserProfile";
import EmailChangePage from "./features/authentication/pages/EmailChange";
import EmailConfirmationPage from "./features/authentication/pages/EmailConfirmation";
import PasswordResetPage from "./features/authentication/pages/PasswordReset";
import InitiatePasswordResetPage from "./features/authentication/pages/InitiatePasswordReset";
import ProfilePicturePage from "./features/users/pages/ProfilePicture";
import FilteredRidesPage from "./features/rides/pages/FilteredRides";
import UserRidesPage from "./features/rides/pages/UserRides";
import SingleRidePage from "./features/rides/pages/SingleRide";
import EditRidePage from "./features/rides/pages/EditRide";
import NewRidePage from "./features/rides/pages/NewRide";
import GivenReviewsPage from "./features/reviews/pages/GivenReviews";
import ReceivedReviewsPage from "./features/reviews/pages/ReceivedReviews";
import NewReviewPage from "./features/reviews/pages/NewReview";
import EditReviewPage from "./features/reviews/pages/EditReview";

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
          <Route path="profile-picture" element={<ProfilePicturePage />} />
          <Route path="change-email" element={<EmailChangePage />} />
          <Route
            path="email-confirmation"
            element={<EmailConfirmationPage />}
          />

          <Route path="rides" element={<UserRidesPage />} />
          <Route path="rides/new" element={<NewRidePage />} />
          <Route path="rides/edit/:id" element={<EditRidePage />} />

          <Route path="rides/review/:id" element={<NewReviewPage />} />
          <Route path="reviews/edit/:id" element={<EditReviewPage />} />
          <Route path="reviews/given/:id" element={<GivenReviewsPage />} />
          <Route
            path="reviews/received/:id"
            element={<ReceivedReviewsPage />}
          />
        </Route>

        <Route
          path="initiate-password-reset"
          element={<InitiatePasswordResetPage />}
        />
        <Route path="password-reset" element={<PasswordResetPage />} />
        <Route path="filtered-rides" element={<FilteredRidesPage />} />
        <Route path="rides/:id" element={<SingleRidePage />} />
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
