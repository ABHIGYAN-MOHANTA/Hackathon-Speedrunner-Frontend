import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faComments } from "@fortawesome/free-solid-svg-icons";
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
    const handleComments = () => navigate(`/dash/comments/${postId}`);

    return (
      <div className="max-w-md bg-white shadow-md rounded-lg overflow-hidden mb-4">
        <div className="p-4">
          <div className="relative">
            <h2 className="text-2xl font-bold mb-2 ml-12">{post.title}</h2>
            <p>
              {" "}
              STATUS:
              {post.completed ? (
                <span className="post__status--completed">Completed</span>
              ) : (
                <span className="post__status--open">Open</span>
              )}
            </p>
            <p className="text-gray-600">DATE: {post.date}</p>
            <p className="text-gray-600">Location: {post.location}</p>
            <p className="text-gray-600">Note: {post.text}</p>
            <p className="text-gray-600">Prize: {post.prize}</p>
            <p className="text-gray-600">Posted By: {post.user.username}</p>
            <p className="text-gray-600">Created: {created}</p>
            <p className="text-gray-600">Updated: {updated}</p>
            <div className="flex justify-center items-center mt-4">
              <img
                src={post.imagesrc}
                alt="event background"
                className="w-100 h-100 object-cover rounded-lg"
              />
            </div>
            <div className="absolute top-0 right-0 mt-4 mr-4 space-x-4">
              <button
                className="icon-button table__button"
                onClick={handleEdit}
              >
                <FontAwesomeIcon icon={faPenToSquare} className="text-2xl" />
              </button>
              <button
                className="icon-button table__button"
                onClick={handleComments}
              >
                <FontAwesomeIcon icon={faComments} className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else return null;
};

const memoizedPost = memo(Post);
export default memoizedPost;
