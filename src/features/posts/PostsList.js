import { useGetPostsQuery } from "./postsApiSlice";
import Post from "./Post";
import { PulseLoader } from "react-spinners";

const PostsList = () => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery("postsList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = posts;

    const tableContent = ids?.length
      ? ids.map((postId) => <Post key={postId} postId={postId} />)
      : null;

    content = (
      <table className="table table--posts">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th post__status">
              Username
            </th>
            <th scope="col" className="table__th post__created">
              Created
            </th>
            <th scope="col" className="table__th post__updated">
              Updated
            </th>
            <th scope="col" className="table__th post__title">
              Title
            </th>
            <th scope="col" className="table__th post__username">
              Owner
            </th>
            <th scope="col" className="table__th post__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};
export default PostsList;
