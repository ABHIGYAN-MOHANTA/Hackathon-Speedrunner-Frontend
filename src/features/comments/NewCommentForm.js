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
      className="icon-button"
      title="Save"
      onClick={onSaveClicked}
      disabled={!canSave}
    >
      <FontAwesomeIcon icon={faPaperPlane} />
    </button>
  );

  const content = (
    <>
      <p className={errClass}>{errContent}</p>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <div className="form__action-buttons">{saveButton}</div>
        </div>

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
      </form>
    </>
  );

  return content;
};
export default NewCommentForm;
