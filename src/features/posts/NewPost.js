import NewPostForm from "./NewPostForm";
import useTitle from "../../hooks/useTitle";

import { useGetUsersQuery } from "../users/usersApiSlice";
import { PulseLoader } from "react-spinners";

const NewPost = () => {
  useTitle("Hackathon Speedrunner: New Post");

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users?.length) return <PulseLoader color={"#FFF"} />;

  const content = <NewPostForm users={users} />;

  return content;
};
export default NewPost;
