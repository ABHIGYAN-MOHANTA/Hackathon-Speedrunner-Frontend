import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";

const DASH_REGEX = /^\/dash(\/)?$/;
const POSTS_REGEX = /^\/dash\/posts(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const { isHacker, isAdmin } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const onNewPostClicked = () => navigate("/dash/posts/new");
  const onNewUserClicked = () => navigate("/dash/users/new");
  const onPostsClicked = () => navigate("/dash/userposts");
  const onUsersClicked = () => navigate("/dash/users");

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !POSTS_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }

  let newPostButton = null;
  if (POSTS_REGEX.test(pathname)) {
    newPostButton = (
      <button
        className="icon-button"
        title="New Post"
        onClick={onNewPostClicked}
      >
        <FontAwesomeIcon
          icon={faFileCirclePlus}
          className="text-white text-2xl mr-2"
          style={{ color: "white" }}
        />
      </button>
    );
  }

  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button
        className="icon-button"
        title="New User"
        onClick={onNewUserClicked}
      >
        <FontAwesomeIcon
          icon={faUserPlus}
          className="text-white text-2xl mr-2"
          style={{ color: "white" }}
        />
      </button>
    );
  }

  let userButton = null;
  if (isHacker || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
      userButton = (
        <button className="icon-button" title="Users" onClick={onUsersClicked}>
          <FontAwesomeIcon
            icon={faUserGear}
            className="text-white text-2xl mr-2"
            style={{ color: "white" }}
          />
        </button>
      );
    }
  }

  let postsButton = null;
  if (!POSTS_REGEX.test(pathname) && pathname.includes("/dash")) {
    postsButton = (
      <button className="icon-button" title="Posts" onClick={onPostsClicked}>
        <FontAwesomeIcon
          icon={faFilePen}
          className="text-white text-2xl mr-2"
          style={{ color: "white" }}
        />
      </button>
    );
  }

  const logoutButton = (
    <button className="icon-button" title="Logout" onClick={sendLogout}>
      <FontAwesomeIcon
        icon={faRightFromBracket}
        className="text-white text-2xl mr-2"
        style={{ color: "white" }}
      />
    </button>
  );

  const errClass = isError ? "errmsg" : "offscreen";

  let buttonContent;
  if (isLoading) {
    buttonContent = <PulseLoader color={"#1f2937"} />;
  } else {
    buttonContent = (
      <>
        {newPostButton}
        {newUserButton}
        {postsButton}
        {userButton}
        {logoutButton}
      </>
    );
  }

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <header className="dash-header bg-gray-800">
        <div
          className={`dash-header__container ${dashClass} container mx-auto py-4 px-6 flex items-center justify-between`}
        >
          <Link to="/dash">
            <h1 className="dash-header__title text-white text-2xl">
              Hackathon Speedrunner
            </h1>
          </Link>
          <nav className="dash-header__nav">{buttonContent}</nav>
        </div>
      </header>
    </>
  );

  return content;
};

export default DashHeader;
