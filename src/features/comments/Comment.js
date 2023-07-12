import {
  useGetCommentsQuery,
  useDeleteCommentMutation,
} from "./commentsApiSlice";
import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumpster } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

const Comment = ({ commentId }) => {
  const { comment } = useGetCommentsQuery("commentsList", {
    selectFromResult: ({ data }) => ({
      comment: data?.entities[commentId],
    }),
  });

  const [
    deleteComment,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteCommentMutation();

  const { username, isAdmin, isHacker } = useAuth();
  // console.log(username);

  if (comment) {
    const created = new Date(comment.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });
    // console.log(comment);

    const handleDeleteComments = async (e) => {
      if (isAdmin || isHacker || username === comment.user.username)
        await deleteComment({ id: comment._id });
    };

    return (
      <div className="max-w-md bg-white shadow-md rounded-lg overflow-hidden mb-4">
        <div className="p-4">
          <div className="relative">
            <h2 className="text-2xl font-bold mb-2 ml-12">{comment.text}</h2>

            <p className="text-gray-600">By:{comment.user.username}</p>
            <p className="text-gray-600">{created}</p>

            <button
              className="icon-button table__button"
              onClick={handleDeleteComments}
            >
              <FontAwesomeIcon icon={faDumpster} />
            </button>
          </div>
        </div>
      </div>
    );
  } else return null;
};

const memoizedComment = memo(Comment);
export default memoizedComment;
