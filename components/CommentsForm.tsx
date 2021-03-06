import React, { useState, useEffect, useRef } from 'react';
import { submitComment } from '../services';

const CommentsForm = ({ slug }: { slug: string }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl: { current: any } = useRef();
  const nameEl: { current: any }  = useRef();
  const emailEl: { current: any }  = useRef();
  const storeDataEl: { current: any }  = useRef();

  const handleCommentSubmission = (event: any) => {
    event.preventDefault();
    setError(false);
    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;
    if (!comment || !name || !email) {
      setError(true);
      return;
    }
    const commentObj = { name, email, comment, slug };
    if (storeData) {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    } else {
      window.localStorage.removeItem('name');
      window.localStorage.removeItem('email');
    }

    submitComment(commentObj).then((res) => {
        setShowSuccessMessage(true);
        setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  useEffect(() => {
      nameEl.current.value = window.localStorage.getItem('name');
      emailEl.current.value = window.localStorage.getItem('email');
  }, []);

  return (
    <form onSubmit={handleCommentSubmission}>
      <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
        <h3 className="pg-4 mb-8 border-b text-xl font-semibold">
          Leave a Reply
        </h3>
        <div className="mb-4 grid grid-cols-1 gap-4">
          <textarea
            ref={commentEl}
            name="comment"
            placeholder="Comment"
            id="inputForPostComment"
            cols={30}
            required
            rows={5}
            className="w-full rounded-lg bg-gray-100 p-4 text-gray-700 outline-none focus:ring-gray-200"
          />
        </div>
        <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <input
            type="text"
            ref={nameEl}
            placeholder="Name"
            name="name"
            required
            className="w-full rounded-lg bg-gray-100 py-2 px-4 text-gray-700 outline-none focus:ring-gray-200"
          />
          <input
            type="email"
            ref={emailEl}
            placeholder="email@gmail.com"
            name="email"
            required
            className="w-full rounded-lg bg-gray-100 py-2 px-4 text-gray-700 outline-none focus:ring-gray-200"
          />
        </div>
        <div className="mb-4 grid grid-cols-1 gap-4">
          <div className="">
            <input
              ref={storeDataEl}
              type="checkbox"
              id="storeDataId"
              name="storeData"
              value="true"
            />
            <label
              className="ml-2 cursor-pointer text-gray-500"
              htmlFor="storeDataId"
            >
              Save my e-mail and name for the next time comment.
            </label>
          </div>
        </div>
        {error && (
          <p className="text-xs text-red-500">All fields are required.</p>
        )}
        <div className="mt-8">
          <button
            type="submit"
            className="ease inline-block cursor-pointer rounded-full bg-pink-600 px-8 py-3 text-lg text-white transition duration-500 hover:bg-indigo-900"
          >
            Post Comment
          </button>
          {showSuccessMessage && (
            <span className="float-right mt-3 text-xl font-semibold text-green-500">
              Comment submitted for review
            </span>
          )}
        </div>
      </div>
    </form>
  );
};

export default CommentsForm;
