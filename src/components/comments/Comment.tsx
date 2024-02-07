import React from "react";
import { images } from "../../constants";

import { FiEdit2, FiMessageSquare, FiTrash } from "react-icons/fi";
import CommentForm from "./CommentForm.tsx";

const Comment = ({
  comment,
  logginedUserId,
  setAffectedComment,
  affectedComment,
  addComment,
  parentId = null,
  updateComment,
  deleteComment,
  replies,
}) => {
  const isUserLoggedIn = Boolean(logginedUserId);
  const isCommentBelongsToUser = logginedUserId === comment.user._id;
  const isReplying =
    affectedComment &&
    affectedComment.type === "replying" &&
    affectedComment._id === comment._id;

  const isEditing =
    affectedComment &&
    affectedComment.type === "editing" &&
    affectedComment._id === comment._id;
  const repliedCommentId = parentId ? parentId : comment._id;
  const replayOnUserId = comment.user._id;
  return (
    <div
      className="flex items-start flex-nowrap gap-x-3 bg-[#F2F4F5] p-3 rounded-lg"
      id={`comment-${comment?._id}`}
    >
      {/* <img src={comment?.image} alt="user profile" /> */}
      <img
        src={comment?.user?.avatar ? comment.user.avatar : images.User}
        alt="user profile"
        className="object-cover rounded-full w-9 h-9"
      />
      <div className="flex flex-col flex-1">
        <h5 className="text-xs font-bold text-Dark-hard lg:text-sm">
          {comment.user.name}
        </h5>
        <span className="text-xs text-Dark-light">
          {new Date(comment.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
          })}
        </span>
        {!isEditing && (
          <p className="mt-[10px] font-opensans text-Dark-light">
            {comment.desc}
          </p>
        )}

        {isEditing && (
          <CommentForm
            btnLabel="Update"
            formSubmitHandler={(value) => {
              updateComment(value, comment._id);
            }}
            formCancelHandler={() => {
              setAffectedComment(null);
            }}
            initialText={comment.desc}
          />
        )}
        <div className="flex items-center mt-3 mb-3 text-sm gap-x-3 text-Dark-light font-roboto">
          {isUserLoggedIn && (
            <button
              className="flex items-center space-x-2"
              onClick={() => {
                setAffectedComment({ type: "replying", _id: comment._id });
              }}
            >
              <FiMessageSquare className="w-4 h-auto" />
              <span>Reply</span>
            </button>
          )}
          {isCommentBelongsToUser && (
            <>
              <button
                className="flex items-center space-x-2"
                onClick={() =>
                  setAffectedComment({ type: "editing", _id: comment._id })
                }
              >
                <FiEdit2 className="w-4 h-auto" />
                <span>Edit</span>
              </button>
              <button
                className="flex items-center space-x-2"
                onClick={() => deleteComment(comment._id)}
              >
                <FiTrash className="w-4 h-auto" />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
        {isReplying && (
          <CommentForm
            btnLabel="Reply"
            formSubmitHandler={(value) =>
              addComment(value, repliedCommentId, replayOnUserId)
            }
            formCancelHandler={() => setAffectedComment(null)}
          />
        )}
        {replies.length > 0 && (
          <div className="">
            {replies.map((reply) => {
              return (
                <Comment
                  key={reply._id}
                  addComment={addComment}
                  affectedComment={affectedComment}
                  setAffectedComment={setAffectedComment}
                  comment={reply}
                  deleteComment={deleteComment}
                  logginedUserId={logginedUserId}
                  replies={[]} // replies of replies
                  updateComment={updateComment}
                  parentId={comment._id}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
