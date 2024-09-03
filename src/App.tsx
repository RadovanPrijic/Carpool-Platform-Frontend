import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { tokenLoader } from "./utils/auth";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} loader={tokenLoader} />
        <Route path="login" element={<Login />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
