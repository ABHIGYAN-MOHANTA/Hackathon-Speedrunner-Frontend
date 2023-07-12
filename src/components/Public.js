import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public min-h-screen flex flex-col items-center justify-center">
      <header className="text-center">
        <h1 className="text-3xl font-bold">
          Welcome to{" "}
          <span className="nowrap text-blue-600">Hackathon Speedrunner!</span>
        </h1>
      </header>
      <main className="public__main mt-8">
        <h2 className="text-xl">
          Ignite Your Innovation: Hackathon Speedrunners Unite!
        </h2>
      </main>
      <footer className="flex space-x-4 mt-8">
        <Link to="/login">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            User Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
            User Signup
          </button>
        </Link>
      </footer>
    </section>
  );
  return content;
};

export default Public;
