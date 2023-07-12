import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { useAddNewCommentMutation } from "./commentsApiSlice";
import { useParams } from "react-router-dom";

const NewCommentForm = ({ users }) => {
  const [addNewComment, { isLoading, isSuccess, isError, error }] =
    useAddNewCommentMutation();

  const { username } = useAuth();

  let userId = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      userId = users[i]._id;
      break;
    }
  }

  const { id } = useParams();

  const [text, setText] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setText("");
    }
  }, [isSuccess]);

  const onTextChanged = (e) => setText(e.target.value);

  const canSave = [text].every(Boolean) && !isLoading;

  const onSaveClicked = async (e) => {
    if (canSave) {
      await addNewComment({
        text: text,
        postId: id,
        createdById: userId,
      });
    }
  };

  const validTextClass = !text ? "form__input--incomplete" : "";
  const errClass = isError ? "errmsg" : "offscreen";
  const errContent = error?.data?.message ?? "";

  const saveButton = (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      title="Save"
      onClick={onSaveClicked}
      disabled={!canSave}
    >
      <FontAwesomeIcon icon={faPaperPlane} />
    </button>
  );

  const content = (
    <>
      <p className={`${errClass} text-red-500 mb-4`}>{errContent}</p>
      <form className="max-w-sm mx-auto mt-8 bg-grey p-6 rounded shadow">
        <div className="mb-4">
          <label className="form__label" htmlFor="text">
            Add new Comment :
          </label>
          <textarea
            className={`form__input form__input--text ${validTextClass}`}
            id="text"
            name="text"
            value={text}
            onChange={onTextChanged}
          />
        </div>
        <div className="form__title-row">
          <div className="form__action-buttons">{saveButton}</div>
        </div>
      </form>
    </>
  );

  return content;
};

export default NewCommentForm;
