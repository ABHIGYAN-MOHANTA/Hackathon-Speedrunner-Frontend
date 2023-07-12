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
    <section className="welcome min-h-screen flex flex-col items-center justify-center">
      <p className="text-gray-600">{today}</p>

      <h1 className="text-3xl font-bold mt-4">Welcome {username}!</h1>

      <div className="mt-8 space-y-4">
        <Link to="/dash/mlh">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            View MLH HACKATHONS
          </button>
        </Link>

        <Link to="/dash/devpost">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            View DEVPOST HACKATHONS
          </button>
        </Link>

        <Link to="/dash/userposts">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            View USER POSTS
          </button>
        </Link>

        {(isHacker || isAdmin) && (
          <Link to="/dash/users">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              View User Settings
            </button>
          </Link>
        )}

        {(isHacker || isAdmin) && (
          <Link to="/dash/users/new">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Add Another as User
            </button>
          </Link>
        )}

        <Link to="/dash/userposts/new">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add New Post
          </button>
        </Link>
      </div>
    </section>
  );

  return content;
};

export default Welcome;
