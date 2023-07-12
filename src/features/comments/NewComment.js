import NewCommentForm from "./NewCommentForm";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { PulseLoader } from "react-spinners";

const NewComment = () => {
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users?.length) return <PulseLoader color={"#1f2937"} />;

  const content = <NewCommentForm users={users} />;

  return content;
};
export default NewComment;
