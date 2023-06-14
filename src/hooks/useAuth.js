import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isHacker = false;
  let isAdmin = false;
  let status = "Member";

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles } = decoded.UserInfo;

    isHacker = roles.includes("Hacker");
    isAdmin = roles.includes("Admin");

    return { username, roles, status, isHacker, isAdmin };
  }

  return { username: "", roles: [], isHacker, isAdmin, status };
};
export default useAuth;
