import React, { useState } from "react";

const CommentForm = ({
  btnLabel,
  formSubmitHandler,
  formCancelHandler = null,
  initialText = "",
  loading = false,
}) => {
  const [value, setValue] = useState(initialText);
  const submitHandler = (e) => {
    e.preventDefault();
    formSubmitHandler(value);
    setValue("");
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col items-end p-4 border rounded-lg border-primary">
        <textarea
          rows={5}
          className="w-full bg-transparent focus:outline-none"
          placeholder="Leave your comment here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
        <div className="flex flex-col-reverse items-center pt-2 gap-x-2 gap-y-2 min-[420px]:flex-row">
          {formCancelHandler && (
            <button
              className="px-6 py-2.5 rounded-lg border border-red-500 text-red-500"
              onClick={formCancelHandler}
            >
              Cancel
            </button>
          )}
          <button
            disabled={loading}
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {btnLabel}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
