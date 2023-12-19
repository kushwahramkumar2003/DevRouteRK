import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm.tsx";
import { getCommentsData } from "../../data/comments.js";
import Comment from "./Comment.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../../../Server/src/controllers/commentControllers";
import {
  createNewComment,
  deleteComment,
  updateComment,
} from "../../services/index/comments.js";
import { useSelector } from "react-redux";
import { Slice } from "@tiptap/pm/model";
import toast from "react-hot-toast";

const CommentsContainer = ({
  className,
  logginedUserId,
  comments,
  postSlug,
}) => {
  const queryClient = useQueryClient();
  const [affectedComment, setAffectedComment] = useState(null);

  const userState = useSelector((state) => state.user);

  const {
    mutate: mutateNewComment,

    isLoading: isLoadingNewComment,
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

  const { mutate: mutateUpdatedComment } = useMutation({
    mutationFn: ({ token, desc, commentId }) => {
      return updateComment({ token, desc, commentId });
    },
    onSuccess: (data) => {
      console.log("data : ", data);
      toast.success("Your comment is updated Successfully");
      queryClient.invalidateQueries(["blog", postSlug]);
    },

    onError: (error) => {
      console.log("error : ", error);

      toast.error(error?.message ? error.message : "Comment Updating failed");
    },
  });

  const { mutate: mutateDeleteComment } = useMutation({
    mutationFn: ({ token, commentId }) => {
      return deleteComment({ token, commentId });
    },
    onSuccess: (data) => {
      console.log("data : ", data);
      toast.success("Your deleted is updated Successfully");
      queryClient.invalidateQueries(["blog", postSlug]);
    },

    onError: (error) => {
      console.log("error : ", error);

      toast.error(error?.message ? error.message : "Comment deleting failed");
    },
  });

  const deleteCommentHandler = (commentId) => {
    mutateDeleteComment({
      token: userState?.userInfo?.token,
      commentId,
    });
  };

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

  const updateCommentHandler = (value, commentId) => {
    mutateUpdatedComment({
      token: userState?.userInfo?.token,
      desc: value,
      commentId,
    });
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
