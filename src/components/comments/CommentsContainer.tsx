import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm.tsx";
import { getCommentsData } from "../../data/comments.js";
import Comment from "./Comment.tsx";
import { useMutation } from "@tanstack/react-query";
import { createComment } from "../../../Server/src/controllers/commentControllers";
import { createNewComment } from "../../services/index/comments.js";
import { useSelector } from "react-redux";
import { Slice } from "@tiptap/pm/model";
import toast from "react-hot-toast";

const CommentsContainer = ({
  className,
  logginedUserId,
  comments,
  postSlug,
}) => {
  const [affectedComment, setAffectedComment] = useState(null);

  const userState = useSelector((state) => state.user);

  const {
    mutate: mutateNewComment,
    isSuccess,
    isLoading: isLoadingNewComment,
    isError,
  } = useMutation({
    mutationFn: ({ token, desc, slug, parent, replyOnUser }) => {
      return createNewComment({ token, desc, slug, parent, replyOnUser });
    },
    onSuccess: (data) => {
      console.log("data : ", data);
      toast.success(
        "Your comment is send successfully, it will be visible after the confirmation of the Admin"
      );
    },
    onError: (error) => {
      console.log("error : ", error);

      toast.error(error?.message ? error.message : "Comment adding failed");
    },
  });

  const deleteCommentHandler = (commentId) => {};
  console.log("comments : ", comments);

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    mutateNewComment({
      desc: value,
      parent,
      replyOnUser,
      token: userState?.userInfo?.token,
      slug: postSlug,
    });
    setAffectedComment(null);
  };

  const updateCommentHandler = (value, parent = null, replyOnUser = null) => {
    setAffectedComment(null);
  };

  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Send"
        formSubmitHandler={(value) => addCommentHandler(value)}
        loading={isLoadingNewComment}
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
              addComment={addCommentHandler}
              updateComment={updateCommentHandler}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CommentsContainer;
