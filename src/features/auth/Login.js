import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { PulseLoader } from "react-spinners";
import usePersist from "../../hooks/usePersist";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <PulseLoader color={"#FFF"} />;

  const content = (
    <section className="public min-h-screen flex flex-col items-center justify-center">
      <header>
        <h1 className="text-3xl font-bold">User Login</h1>
      </header>
      <main className="login mt-8">
        <p
          ref={errRef}
          className={`${errClass} text-red-600`}
          aria-live="assertive"
        >
          {errMsg}
        </p>

        <form className="form mt-4" onSubmit={handleSubmit}>
          <label htmlFor="username" className="text-lg">
            Username:
          </label>
          <input
            className="form__input mt-2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />

          <label htmlFor="password" className="text-lg mt-4">
            Password:
          </label>
          <input
            className="form__input mt-2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            id="password"
            onChange={handlePwdInput}
            value={password}
            required
          />
          <button className="form__submit-button mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Sign In
          </button>

          <label
            htmlFor="persist"
            className="form__persist flex items-center mt-4 text-sm"
          >
            <input
              type="checkbox"
              className="form__checkbox mr-2"
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
            Trust This Device
          </label>
        </form>
      </main>
      <footer className="mt-8">
        <Link to="/" className="text-blue-600 hover:underline">
          Back to Home
        </Link>
      </footer>
    </section>
  );

  return content;
};

export default Login;
