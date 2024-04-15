import React from "react";
import { Link } from "react-router-dom";

import { deletePost, getAllPosts } from "../../../../services/index/posts";

import { images } from "../../../../constants";
import Pagination from "../../../../components/Pagination.tsx";

import { useDataTable } from "../../../../hooks/useDataTable.js";
import DataTable from "../../components/DataTable.jsx";
// eslint-disable-next-line
let isFirstRender = true;

const ManagePosts = () => {
  const {
    userState,
    currentPage,
    searchKeyword,
    data: PostData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: (): any => getAllPosts(searchKeyword, currentPage),
    dataQueryKey: "posts",
    deleteDataMessage: "Post deleted successfully",
    mutateDeleteFn: ({ slug, token }) => {
      return deletePost({ slug, token });
    },
  });

  return (
    <DataTable
      pageTitle={"Manage Posts"}
      DataListName={"Posts"}
      searchInputPlaceHolder={"Post title..."}
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={[
        "Title",
        "Categories",
        "Created At",
        "Tags",
        "Actions",
      ]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={PostData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={PostData?.headers}
      userState={userState}
    >
      {PostData?.data.map((post) => (
        <tr>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="relative block">
                  <img
                    src={post?.photo ? post.photo : images.Sample}
                    alt={post.title}
                    className="object-cover w-10 mx-auto rounded-lg aspect-square"
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">{post.title}</p>
              </div>
            </div>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
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
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
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
          </td>
          <td className="px-5 py-5 space-x-5 text-sm bg-white border-b border-gray-200">
            <button
              disabled={isLoadingDeleteData}
              type="button"
              className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={() => {
                deleteDataHandler({
                  slug: post?.slug,
                  token: userState.userInfo.token,
                });
              }}
            >
              Delete
            </button>
            <Link
              to={`/admin/posts/manage/edit/${post?.slug}`}
              className="text-green-600 hover:text-green-900"
            >
              Edit
            </Link>
          </td>
        </tr>
      ))}
      ;
    </DataTable>
  );
};

export default ManagePosts;
