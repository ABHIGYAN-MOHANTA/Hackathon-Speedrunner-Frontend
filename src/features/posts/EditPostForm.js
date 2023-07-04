import { useState, useEffect } from "react";
import { useUpdatePostMutation, useDeletePostMutation } from "./postsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

const EditPostForm = ({ post, users }) => {
  const { isHacker, isAdmin } = useAuth();

  const [updatePost, { isLoading, isSuccess, isError, error }] =
    useUpdatePostMutation();

  const [
    deletePost,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeletePostMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(post.title);
  const [text, setText] = useState(post.text);
  const [date, setDate] = useState(post.date);
  const [location, setLocation] = useState(post.location);
  const [prize, setPrize] = useState(post.prize);
  const [completed, setCompleted] = useState(post.completed);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setText("");
      setDate("");
      setLocation("");
      setPrize("");
      navigate("/dash/userposts");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onCompletedChanged = (e) => setCompleted((prev) => !prev);
  const onDateChanged = (e) => setDate(e.target.value);
  const onLocationChanged = (e) => setLocation(e.target.value);
  const onPrizeChanged = (e) => setPrize(e.target.value);

  const canSave =
    [title, text, date, location, prize].every(Boolean) && !isLoading;

  const onSavePostClicked = async (e) => {
    if (canSave) {
      await updatePost({
        id: post.id,
        user: post.user._id,
        title: title,
        text: text,
        date: date,
        location: location,
        prize: prize,
        completed: completed,
      });
    }
  };

  const onDeletePostClicked = async () => {
    await deletePost({ id: post.id });
  };

  const created = new Date(post.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(post.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";
  const validDateClass = !date ? "form__input--incomplete" : "";
  const validLocationClass = !location ? "form__input--incomplete" : "";
  const validPrizeClass = !prize ? "form__input--incomplete" : "";
  const validCompletedClass = !completed ? "form__input--incomplete" : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  let deleteButton = null;
  if (isHacker || isAdmin) {
    deleteButton = (
      <button
        className="icon-button"
        title="Delete"
        onClick={onDeletePostClicked}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    );
  }

  let saveButton = null;
  if (isHacker || isAdmin) {
    saveButton = (
      <button
        className="icon-button"
        title="Save"
        onClick={onSavePostClicked}
        disabled={!canSave}
      >
        <FontAwesomeIcon icon={faSave} />
      </button>
    );
  }

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Post {title}</h2>
          <div className="form__action-buttons">
            {saveButton}
            {deleteButton}
          </div>
        </div>
        <label className="form__label" htmlFor="title">
          Title:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label className="form__label" htmlFor="text">
          Description :
        </label>
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id="text"
          name="text"
          value={text}
          onChange={onTextChanged}
        />
        <label className="form__label" htmlFor="date">
          Date:
        </label>
        <input
          className={`form__input ${validDateClass}`}
          id="date"
          name="date"
          type="text"
          autoComplete="off"
          value={date}
          onChange={onDateChanged}
        />
        <label className="form__label" htmlFor="location">
          Location:
        </label>
        <input
          className={`form__input ${validLocationClass}`}
          id="location"
          name="location"
          type="text"
          autoComplete="off"
          value={location}
          onChange={onLocationChanged}
        />
        <label className="form__label" htmlFor="prize">
          Prize:
        </label>
        <input
          className={`form__input ${validPrizeClass}`}
          id="prize"
          name="prize"
          type="text"
          autoComplete="off"
          value={prize}
          onChange={onPrizeChanged}
        />
        <div className="form__row">
          <div className="form__divider">
            <label
              className="form__label form__checkbox-container"
              htmlFor="completed"
            >
              WORK COMPLETE:
              <input
                className={`form__checkbox ${validCompletedClass}`}
                id="completed"
                name="completed"
                type="checkbox"
                checked={completed}
                onChange={onCompletedChanged}
              />
            </label>
          </div>
          <div className="form__divider">
            <p className="form__created">
              Created:
              <br />
              {created}
            </p>
            <p className="form__updated">
              Updated:
              <br />
              {updated}
            </p>
          </div>
        </div>
      </form>
    </>
  );

  return content;
};

export default EditPostForm;
