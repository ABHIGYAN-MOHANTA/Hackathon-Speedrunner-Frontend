import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import PostsList from "./features/posts/PostsList";
import UsersList from "./features/users/UsersList";
import MlhList from "./features/mlh/MlhList";
import DevpostList from "./features/devpost/DevpostList";
import EditPost from "./features/posts/EditPost";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import NewUserSignupForm from "./features/users/NewUserSignupForm";
import NewPost from "./features/posts/NewPost";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import { ROLES } from "./config/roles";
import RequireAuth from "./features/auth/RequireAuth";
import useTitle from "./hooks/useTitle";

function App() {
  useTitle("Hackathon Speedrunner");
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<NewUserSignupForm />} />
        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />

                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Hacker, ROLES.Admin]} />
                  }
                >
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>
                <Route path="userposts">
                  <Route index element={<PostsList />} />
                  <Route path=":id" element={<EditPost />} />
                  <Route path="new" element={<NewPost />} />
                </Route>
                <Route path="mlh">
                  <Route index element={<MlhList />} />
                </Route>
                <Route path="devpost">
                  <Route index element={<DevpostList />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
        {/* End of Protected Routes */}
      </Route>
    </Routes>
  );
}

export default App;
