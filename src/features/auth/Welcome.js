import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Welcome = () => {
  const { username, isHacker, isAdmin } = useAuth();

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="welcome">
      <p>{today}</p>

      <h1>Welcome {username}!</h1>

      <p>
        <Link to="/dash/mlh">
          <button>View MLH HACKATHONS</button>
        </Link>
      </p>
      <p>
        <Link to="/dash/devpost">
          <button>View DEVPOST HACKATHONS</button>
        </Link>
      </p>
      <p>
        <Link to="/dash/userposts">
          <button>View USER POSTS</button>
        </Link>
      </p>

      {(isHacker || isAdmin) && (
        <p>
          <Link to="/dash/users">
            <button>View User Settings</button>
          </Link>
        </p>
      )}

      <p>
        <Link to="/dash/users/new">
          <button>Add Yourself as User</button>
        </Link>
      </p>

      <p>
        <Link to="/dash/userposts/new">
          <button>Add New Post</button>
        </Link>
      </p>
    </section>
  );

  return content;
};
export default Welcome;
