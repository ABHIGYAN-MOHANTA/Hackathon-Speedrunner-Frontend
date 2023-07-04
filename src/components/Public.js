import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Hackathon Speedrunner!</span>
        </h1>
      </header>
      <main className="public__main">
        <h2>Ignite Your Innovation: Hackathon Speedrunners Unite!</h2>
      </main>
      <footer>
        <Link to="/login">
          <button>User Login</button>
        </Link>
      </footer>
      <footer>
        <Link to="/signup">
          <button>User Signup</button>
        </Link>
      </footer>
    </section>
  );
  return content;
};
export default Public;
