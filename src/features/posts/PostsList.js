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

  if (isLoading) content = <PulseLoader color={"#1f2937"} />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = posts;

    const tableContent = ids?.length
      ? ids.map((postId) => <Post key={postId} postId={postId} />)
      : null;

    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tableContent}
      </div>
    );
  }

  return content;
};
export default PostsList;
