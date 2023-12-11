import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="w-full max-w-md px-4 py-2 mx-auto text-gray-900 bg-red-400 rounded-lg ">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
