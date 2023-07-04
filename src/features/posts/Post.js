import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useGetPostsQuery } from "./postsApiSlice";
import { memo } from "react";

const Post = ({ postId }) => {
  const { post } = useGetPostsQuery("postsList", {
    selectFromResult: ({ data }) => ({
      post: data?.entities[postId],
    }),
  });

  const navigate = useNavigate();

  if (post) {
    const created = new Date(post.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const updated = new Date(post.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const handleEdit = () => navigate(`/dash/userposts/${postId}`);

    return (
      <tr className="table__row">
        <td className="table__cell post__status">
          {post.completed ? (
            <span className="post__status--completed">Completed</span>
          ) : (
            <span className="post__status--open">Open</span>
          )}
        </td>
        <td className="table__cell post__username">{post.date}</td>
        <td className="table__cell post__created">{created}</td>
        <td className="table__cell post__updated">{updated}</td>
        <td className="table__cell post__title">{post.title}</td>
        <td className="table__cell post__username">{post.user.username}</td>
        <td className="table__cell post__username">{post.text}</td>
        <td className="table__cell post__username">{post.location}</td>
        <td className="table__cell post__username">{post.prize}</td>
        <td className="table__cell post__username">
          <img
            src={post.imagesrc}
            style={{ width: "200px" }}
            alt="event logo"
          />
        </td>
        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

const memoizedPost = memo(Post);
export default memoizedPost;
