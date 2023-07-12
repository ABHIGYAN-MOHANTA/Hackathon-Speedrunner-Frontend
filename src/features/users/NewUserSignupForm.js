import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate, Link } from "react-router-dom";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserSignupForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const canSave = [validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username, password, roles: ["Member"] });
    }
  };

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";

  const content = (
    <section className="public min-h-screen flex flex-col items-center justify-center">
      <header>
        <h1 className="text-3xl font-bold">User Signup</h1>
      </header>
      <main className="login mt-8">
        <p className={`${errClass} text-red-600`}>{error?.data?.message}</p>

        <form className="form mt-4" onSubmit={onSaveUserClicked}>
          <div className="form__title-row">
            <div className="form__action-buttons"></div>
          </div>
          <label className="form__label" htmlFor="username">
            Username: <span className="nowrap">[3-20 letters]</span>
          </label>
          <input
            className={`form__input ${validUserClass} border focus:border-blue-500 px-4 py-2 rounded`}
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            value={username}
            onChange={onUsernameChanged}
          />

          <label className="form__label" htmlFor="password">
            Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
          </label>
          <input
            className={`form__input ${validPwdClass} border focus:border-blue-500 px-4 py-2 rounded`}
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={onPasswordChanged}
          />

          <button
            className={`icon-button ${
              canSave
                ? "text-white form__submit-button bg-blue-600 px-6 py-2 rounded mt-4"
                : "text-gray-400 form__submit-button bg-blue-600 px-6 py-2 rounded mt-4 cursor-not-allowed "
            }`}
            title="Save"
            disabled={!canSave}
          >
            SignUp
          </button>
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

export default NewUserSignupForm;
