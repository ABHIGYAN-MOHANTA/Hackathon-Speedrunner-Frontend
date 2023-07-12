import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useGetUsersQuery } from "./usersApiSlice";
import { memo } from "react";

const User = ({ userId }) => {
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  <div className="3.54"></div>;

  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);

    const userRolesString = user.roles.toString().replaceAll(",", ", ");

    const cellStatus = user.active ? "" : "table__cell--inactive";

    return (
      <div className="max-w-md bg-white shadow-md rounded-lg overflow-hidden mb-4">
        <div className="p-4">
          <div className="relative">
            <h2 className="text-2xl font-bold mb-2 ml-12">{user.username}</h2>
            <p className="text-gray-600">ROLE: {userRolesString}</p>
            <button className="icon-button table__button" onClick={handleEdit}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </div>
        </div>
      </div>
    );
  } else return null;
};

const memoizedUser = memo(User);
export default memoizedUser;
