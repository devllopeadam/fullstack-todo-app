import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../pages/Layout";
import ProtectedRoute from "../auth/ProtectedRoute";
import Todos from "../pages/Todos";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import PageNotFound from "../pages/PageNotFound";
import Login from "../pages/Login";
import HomePage from "../pages/index";
import ErrorHandler from "../errors/ErrorHandler";

const storageKey = "loggedInUser";
const userDataString: string | null = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<Layout />}
        errorElement={<ErrorHandler />}>
        <Route
          index
          element={
            <ProtectedRoute
              isAllowed={userData?.jwt}
              redirectPath="./login">
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              redirectPath="/login"
              isAllowed={userData?.jwt}>
              <Profile />
              <h2>Profile Page</h2>
            </ProtectedRoute>
          }
        />
        <Route
          path="/todos"
          element={
            <ProtectedRoute
              isAllowed={userData?.jwt}
              redirectPath="/login"
              data={userData}>
              <Todos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute
              isAllowed={!userData?.jwt}
              redirectPath="/">
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute
              isAllowed={!userData?.jwt}
              redirectPath="/login">
              <Register />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path="*"
        element={<PageNotFound />}
      />
    </>
  )
);

export default router;
