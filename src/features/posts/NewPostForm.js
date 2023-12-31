import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation } from "./postsApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

const NewPostForm = ({ users }) => {
  const [addNewPost, { isLoading, isSuccess, isError, error }] =
    useAddNewPostMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { username } = useAuth();
  let userId = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      userId = users[i]._id;
      break;
    }
  }

  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [prize, setPrize] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      setDate("");
      setLocation("");
      setPrize("");
      setFile("");
      navigate("/dash/userposts");
    }
  }, [isSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onDateChanged = (e) => setDate(e.target.value);
  const onLocationChanged = (e) => setLocation(e.target.value);
  const onPrizeChanged = (e) => setPrize(e.target.value);
  const onFileChanged = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const canSave =
    [title, text, userId, date, location, prize, file].every(Boolean) &&
    !isLoading;

  const onSavePostClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      const formData = new FormData();
      formData.append(
        "json",
        JSON.stringify({
          user: userId,
          title: title,
          text: text,
          date: date,
          location: location,
          prize: prize,
          completed: false,
        })
      );
      formData.append("file", file);
      await addNewPost(formData);
    }
  };

  const errClass = isError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";
  const validDateClass = !date ? "form__input--incomplete" : "";
  const validLocationClass = !location ? "form__input--incomplete" : "";
  const validPrizeClass = !prize ? "form__input--incomplete" : "";
  const validFileClass = !file ? "form__input--incomplete" : "";

  const content = (
    <div className="flex flex-col items-center justify-center h-full">
      <p className={`${errClass} text-red-500 mb-4`}>{error?.data?.message}</p>

      <form
        className="max-w-sm mx-auto mt-8 bg-grey p-6 rounded shadow"
        onSubmit={onSavePostClicked}
        encType="multipart/form-data"
      >
        <div className="form__title-row flex items-center mb-4">
          <h2 className="text-2xl font-bold">New Post</h2>
        </div>

        <div className="mb-4">
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
        </div>

        <div className="mb-4">
          <label className="form__label" htmlFor="text">
            Description:
          </label>
          <textarea
            className={`form__input form__input--text ${validTextClass}`}
            id="text"
            name="text"
            value={text}
            onChange={onTextChanged}
          />
        </div>

        <div className="mb-4">
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
        </div>

        <div className="mb-4">
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
        </div>

        <div className="mb-4">
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
        </div>

        <div className="mb-4">
          <label className="form__label" htmlFor="file">
            Image File:
          </label>
          <input
            className={`form__input ${validFileClass}`}
            id="file"
            name="file"
            type="file"
            autoComplete="off"
            onChange={onFileChanged}
          />
        </div>
        <div className="form__action-buttons">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            title="Save"
            disabled={!canSave}
          >
            Save: <FontAwesomeIcon icon={faSave} />
          </button>
        </div>
      </form>
    </div>
  );

  return content;
};

export default NewPostForm;
