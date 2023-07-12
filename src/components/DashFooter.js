import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashFooter = () => {
  const { username, status } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => navigate("/dash");

  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = (
      <button
        className="dash-footer__button icon-button"
        title="Home"
        onClick={onGoHomeClicked}
      >
        <FontAwesomeIcon icon={faHouse} className="text-beige text-2xl" />
      </button>
    );
  }

  const content = (
    <footer className="dash-footer bg-gray-800 text-white text-center py-4">
      <div className="container mx-auto">
        {goHomeButton}
        <p className="mb-2">Current User: {username}</p>
        <p className="mb-2">Status: {status}</p>
        <p>Made with ❤️ and Perseverance by Abhigyan Mohanta!</p>
      </div>
    </footer>
  );

  return content;
};

export default DashFooter;
