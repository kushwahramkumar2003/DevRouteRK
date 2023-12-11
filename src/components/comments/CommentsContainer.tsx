import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm.tsx";
import { getCommentsData } from "../../data/comments.js";
import Comment from "./Comment.tsx";

const CommentsContainer = ({ className, logginedUserId, comments }) => {
  const [affectedComment, setAffectedComment] = useState(null);

  const deleteCommentHandler = (commentId) => {};
  console.log("comments : ", comments);

  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Send"
        formSubmitHandler={(value) => addCommentHandler(value)}
      />
      <div className="mt-8 space-y-4">
        {comments.map((comment, index) => {
          return (
            <Comment
              key={comment._id}
              comment={comment}
              logginedUserId={logginedUserId}
              affectedComment={affectedComment}
              setAffectedComment={setAffectedComment}
              deleteComment={deleteCommentHandler}
              replies={comment.replies}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CommentsContainer;
