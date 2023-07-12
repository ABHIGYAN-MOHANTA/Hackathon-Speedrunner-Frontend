import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";
import useAuth from "../../hooks/useAuth";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const { isHacker, isAdmin } = useAuth();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Member"]);

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
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username, password, roles });
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  let content = (
    <h3 className="text-2xl font-bold">
      You don't have the right permissions to add a new user!
    </h3>
  );

  if (isHacker || isAdmin) {
    content = (
      <div className="max-w-sm mx-auto mt-8 bg-grey p-6 rounded shadow">
        <p className={`text-red-500 ${errClass}`}>{error?.data?.message}</p>

        <form className="mt-6" onSubmit={onSaveUserClicked}>
          <h2 className="text-2xl font-bold mb-4">New User</h2>

          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="username">
              Username: <span className="text-gray-500">(3-20 letters)</span>
            </label>
            <input
              className={`form__input ${validUserClass}`}
              id="username"
              name="username"
              type="text"
              autoComplete="off"
              value={username}
              onChange={onUsernameChanged}
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="password">
              Password:{" "}
              <span className="text-gray-500">(4-12 chars incl. !@#$%)</span>
            </label>
            <input
              className={`form__input ${validPwdClass}`}
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={onPasswordChanged}
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="roles">
              ASSIGNED ROLES:
            </label>
            <select
              id="roles"
              name="roles"
              className={`form__select ${validRolesClass}`}
              multiple={true}
              size="3"
              value={roles}
              onChange={onRolesChanged}
            >
              {options}
            </select>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            type="submit"
            disabled={!canSave}
          >
            <FontAwesomeIcon icon={faSave} className="mr-2" />
            Save
          </button>
        </form>
      </div>
    );
  }

  return content;
};

export default NewUserForm;
