import React from "react";
import { Link } from "react-router-dom";
import { useDataTable } from "../../../../hooks/useDataTable.js";
import {
  deleteComment,
  getAllComments,
  updateComment,
} from "../../../../services/index/comments.ts";
import DataTable from "../../components/DataTable.jsx";
import images from "../../../../constants/images.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Comments = () => {
  const queryClient = useQueryClient();
  const {
    userState,
    currentPage,
    searchKeyword,
    data: commentsData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: (): any =>
      getAllComments(userState.userInfo.token, searchKeyword, currentPage),
    dataQueryKey: "comments",
    deleteDataMessage: "Comments deleted successfully",
    mutateDeleteFn: ({ slug, token }) => {
      return deleteComment({ token, commentId: slug });
    },
  });

  const {
    mutate: mutateUpdateCommentCheck,
    isPaused: isLoadingUpdateCommentCheck,
  } = useMutation({
    mutationFn: ({
      token,
      check,
      commentId,
    }: {
      token: string;
      commentId: string;
      check: boolean;
    }) => {
      return updateComment({ token, check, commentId, desc: "" });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success(data?.check ? "Comment approved" : "Comment disapproved");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return (
    <DataTable
      pageTitle={"Manage Comments"}
      DataListName={"Comments"}
      searchInputPlaceHolder={"Search comments..."}
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={[
        "Author",
        "Comment",
        "In Respond to",
        "Created At",
        "Actions",
      ]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={commentsData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={commentsData?.headers}
      userState={userState}
    >
      {commentsData?.data.map((comment) => (
        <tr>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="relative block">
                  <img
                    src={
                      comment?.user?.avatar
                        ? comment?.user?.avatar
                        : images.Sample
                    }
                    alt={comment?.user?.name}
                    className="object-cover w-10 mx-auto rounded-lg aspect-square"
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">
                  {comment?.user?.name}
                </p>
              </div>
            </div>
          </td>
          {/* <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {post.categories.length > 0
                ? post.categories
                    .slice(0, 3)
                    .map(
                      (category, index) =>
                        `${category.title}${
                          post.categories.slice(0, 3).length === index + 1
                            ? ""
                            : ", "
                        }`
                    )
                : "Uncategorized"}
            </p>
          </td> */}
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            {comment?.replyOnUser !== null && (
              <p className="text-gray-900 whitespace-no-wrap">
                In reply to{" "}
                <Link
                  to={`/blog/${comment?.post?.slug}/#comment-${comment?._id}`}
                  className="text-blue-500"
                >
                  {comment?.replyOnUser?.name}
                </Link>
              </p>
            )}
            <p className="text-gray-900 whitespace-no-wrap">{comment?.desc}</p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              <Link
                to={`/blog/${comment?.post?.slug}}`}
                className="text-blue-500"
              >
                {comment?.post?.title}
              </Link>
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {new Date(comment?.createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                minute: "numeric",
              })}
            </p>
          </td>

          {/* <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex gap-x-2">
              {post.tags.length > 0
                ? post.tags.map((tag, index) => (
                    <p>
                      {tag}
                      {post.tags.length - 1 !== index && ","}
                    </p>
                  ))
                : "No tags"}
            </div>
          </td> */}
          <td className="px-5 py-5 space-x-5 text-sm bg-white border-b border-gray-200">
            <button
              disabled={isLoadingUpdateCommentCheck}
              type="button"
              className={` disabled:opacity-70 disabled:cursor-not-allowed ${
                comment?.check
                  ? "text-yellow-600 hover:text-yellow-900 "
                  : "text-green-600 hover:text-green-900 "
              }`}
              onClick={() => {
                mutateUpdateCommentCheck({
                  token: userState.userInfo.token,
                  check: comment?.check ? false : true,
                  commentId: comment?._id,
                });
              }}
            >
              {comment?.check ? "Unapprove" : "Approve"}
            </button>
            <button
              disabled={isLoadingDeleteData}
              type="button"
              className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={() => {
                deleteDataHandler({
                  slug: comment?._id,
                  token: userState.userInfo.token,
                });
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
      ;
    </DataTable>
  );
};

export default Comments;
