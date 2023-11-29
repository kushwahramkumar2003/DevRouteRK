import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm.tsx";
import { getCommentsData } from "../../data/comments.js";
import Comment from "./Comment.tsx";

const CommentsContainer = ({ className, logginedUserId }) => {
  const [comments, setComments] = useState([]);
  const mainComments = comments.filter((comment) => {
    return comment.parent === null;
  });

  const updateCommentHandler = (value, commentId) => {
    const updatedComments = comments.map((comment) => {
      if (comment._id === commentId) {
        return {
          ...comment,
          desc: value,
        };
      }
      return comment;
    });
    setComments(updatedComments);
    setAffectedComment(null);
  };

  const [affectedComment, setAffectedComment] = useState(null);
  console.log(comments);

  useEffect(() => {
    (async () => {
      const commentsData = await getCommentsData();
      //   setComments((commentsData) => {
      //     return commentsData;
      //   });
      setComments(commentsData);
    })();
  }, []);

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    const newComment = {
      _id: Math.random().toString(),
      user: {
        _id: "a",
        name: "Mohammad Rezaii",
      },
      desc: value,
      post: "1",
      parent: parent,
      replyOnUser: replyOnUser,
      createdAt: new Date().toISOString(),
    };
    setComments((prev) => {
      return [newComment, ...prev];
    });
    setAffectedComment(null);
  };

  const deleteCommentHandler = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment._id !== commentId
    );
    setComments(updatedComments);
  };

  const getRepliesHandler = (commentId) => {
    const replies = comments.filter((comment) => comment.parent === commentId);
    replies.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    return replies;
  };
  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Send"
        formSubmitHandler={(value) => addCommentHandler(value)}
      />
      <div className="mt-8 space-y-4">
        {mainComments.map((comment, index) => {
          return (
            <Comment
              key={comment._id}
              comment={comment}
              logginedUserId={logginedUserId}
              affectedComment={affectedComment}
              setAffectedComment={setAffectedComment}
              addComment={addCommentHandler}
              updateComment={updateCommentHandler}
              deleteComment={deleteCommentHandler}
              replies={getRepliesHandler(comment._id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CommentsContainer;
