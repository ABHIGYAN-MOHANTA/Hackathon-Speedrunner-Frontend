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
      <tr className="table__row">
        <td className="table__cell comment__created">{created}</td>
        <td className="table__cell comment__text">{comment.text}</td>
        <td className="table__cell comment__username">
          {comment.user.username}
        </td>
        <td className="table__cell comment__delete">
          <button
            className="icon-button table__button"
            onClick={handleDeleteComments}
          >
            <FontAwesomeIcon icon={faDumpster} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

const memoizedComment = memo(Comment);
export default memoizedComment;
