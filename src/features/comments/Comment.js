import { useGetCommentsQuery } from "./commentsApiSlice";
import { memo } from "react";

const Comment = ({ commentId }) => {
  const { comment } = useGetCommentsQuery("commentsList", {
    selectFromResult: ({ data }) => ({
      comment: data?.entities[commentId],
    }),
  });

  if (comment) {
    const created = new Date(comment.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    return (
      <tr className="table__row">
        <td className="table__cell comment__created">{created}</td>
        <td className="table__cell comment__text">{comment.text}</td>
        <td className="table__cell comment__username">
          {comment.user.username}
        </td>
      </tr>
    );
  } else return null;
};

const memoizedComment = memo(Comment);
export default memoizedComment;
