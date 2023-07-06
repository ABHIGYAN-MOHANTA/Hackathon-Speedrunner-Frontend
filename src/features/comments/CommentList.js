import { useParams } from "react-router-dom";
import { useGetCommentsQuery } from "./commentsApiSlice";
import Comment from "./Comment";
import { PulseLoader } from "react-spinners";
import NewComment from "./NewComment"; //add this in the beginning inside the return statement

const CommentList = () => {
  const {
    data: comments,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCommentsQuery("commentsList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const { id } = useParams();

  let content;

  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { entities } = comments;

    const filteredIds = Object.values(entities)
      .filter((obj) => obj.post?._id === id)
      .map((obj) => obj.id);

    // console.log(filteredIds);

    const tableContent = filteredIds?.length
      ? filteredIds.map((commentId) => {
          return <Comment key={commentId} commentId={commentId} />;
        })
      : null;

    content = (
      <>
        <NewComment />
        <table className="table table--comments">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th comment__updated">
                Created At
              </th>
              <th scope="col" className="table__th comment__edit">
                Comment
              </th>
              <th scope="col" className="table__th comment__username">
                User
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </>
    );
  }

  return content;
};
export default CommentList;
