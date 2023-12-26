import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getAllPosts,
  getSinglePost,
  updatePost,
} from "../../../../services/index/posts";
import parse from "html-react-parser";
import { generateHTML } from "@tiptap/react";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import italic from "@tiptap/extension-italic";
import bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import toast from "react-hot-toast";

import ArticleDetailSkeleton from "../../../articleDetail/components/ArticleDetailSkeleton.tsx";
import ErrorMessage from "../../../../components/ErrorMessage.tsx";
import BreadCrumbs from "../../../../components/BreadCrumbs.tsx";
import { images } from "../../../../constants";
import CommentsContainer from "../../../../components/comments/CommentsContainer.tsx";
import SuggestedPosts from "../../../articleDetail/container/SuggestedPosts.tsx";
import SocialShareButtons from "../../../../components/comments/SocialShareButtons.tsx";
import parseJsonToHtml from "../../../../utils/parseJsonToHtml.ts";
import { HiOutlineCamera } from "react-icons/hi";
import Editor from "../../../../components/editor/Editor.tsx";

const EditPost = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const [initialPhoto, setInitialPhoto] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [body, setBody] = useState(null);
  const [categories, setCategories] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState(null);
  const [postSlug, setPostSlug] = useState(slug);
  const [caption, setCaption] = useState("");

  // const [body, setBody] = useState(null);

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getSinglePost({ slug }),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      setInitialPhoto(data?.photo);
    }
    if (isSuccess) {
      setInitialPhoto(data?.photo);
      setCategories(data.categories.map((item) => item._id));
      setTitle(data.title);
      setTags(data.tags);
      //   setBody(parseJsonToHtml(data?.body));
    }
    if (isError) {
      toast.error("Error while fetching data");
    }
  }, [isSuccess, isLoading, isError, error, data]);

  const {
    mutate: mutateUpdatePostDetail,
    isPending: isLoadingUpdatePostDetail,
  } = useMutation({
    mutationFn: ({ updatedData, slug, token }) => {
      return updatePost({
        updatedData,
        slug,
        token,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["blog", slug]);
      toast.success("Post is updated");
      navigate(`/admin/posts/manage/edit/${data.slug}`, { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleUpdatePost = async () => {
    let updatedData = new FormData();

    if (!initialPhoto && photo) {
      updatedData.append("postPicture", photo);
    } else if (initialPhoto && !photo) {
      const urlToObject = async (url) => {
        let reponse = await fetch(url);
        let blob = await reponse.blob();
        const file = new File([blob], initialPhoto, { type: blob.type });
        return file;
      };
      const picture = await urlToObject(data?.photo);

      updatedData.append("postPicture", picture);
    }

    updatedData.append(
      "document",
      JSON.stringify({ body, categories, title, tags, slug: postSlug, caption })
    );

    mutateUpdatePostDetail({
      updatedData,
      slug,
      token: userState.userInfo.token,
    });
  };

  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete your Post picture?")) {
      setInitialPhoto(null);
      setPhoto(null);
    }
  };

  let isPostDataLoaded = !isLoading && !isError;

  return (
    <div>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post detail" />
      ) : (
        <section className="container flex flex-col max-w-5xl px-5 py-5 mx-auto lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">
            <label htmlFor="postPicture" className="w-full cursor-pointer">
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt={data?.title}
                  className="w-full rounded-xl"
                />
              ) : initialPhoto ? (
                <img
                  src={data?.photo}
                  alt={data?.title}
                  className="w-full rounded-xl"
                />
              ) : (
                <div className="w-full min-h-[200px] bg-blue-50/50 flex justify-center items-center">
                  <HiOutlineCamera className="h-auto w-7 text-primary" />
                </div>
              )}
            </label>
            <input
              type="file"
              className="sr-only"
              id="postPicture"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={handleDeleteImage}
              className="px-3 py-2 mt-5 text-sm font-semibold text-white bg-red-500 rounded-lg w-fit"
            >
              Delete Image
            </button>
            <div className="flex gap-2 mt-4">
              {data?.categories.map((category) => (
                <Link
                  to={`/blog?category=${category.name}`}
                  className="inline-block text-sm text-primary font-roboto md:text-base"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <div className="w-full d-form-control">
              <label className="d-label" htmlFor="title">
                <span className="d-label-text">Title</span>
              </label>
              <input
                id="title"
                value={title}
                className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="title"
              />
            </div>
            <div className="w-full d-form-control">
              <label className="d-label" htmlFor="caption">
                <span className="d-label-text">caption</span>
              </label>
              <input
                id="caption"
                value={caption}
                className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
                onChange={(e) => setCaption(e.target.value)}
                placeholder="caption"
              />
            </div>
            <div className="w-full d-form-control">
              <label className="d-label" htmlFor="slug">
                <span className="d-label-text">slug</span>
              </label>
              <input
                id="slug"
                value={postSlug}
                className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
                onChange={(e) =>
                  setPostSlug(e.target.value.replace(/\s+/g, "-").toLowerCase())
                }
                placeholder="post slug"
              />
            </div>
            <div className="mt-2 mb-5">
              <label className="d-label">
                <span className="d-label-text">categories</span>
              </label>
              {/* {isPostDataLoaded && (
                <MultiSelectTagDropdown
                  loadOptions={promiseOptions}
                  defaultValue={data.categories.map(categoryToOption)}
                  onChange={(newValue) =>
                    setCategories(newValue.map((item) => item.value))
                  }
                />
              )} */}
            </div>
            <div className="mt-2 mb-5">
              <label className="d-label">
                <span className="d-label-text">tags</span>
              </label>
              {/* {isPostDataLoaded && (
                <CreatableSelect
                  defaultValue={data.tags.map((tag) => ({
                    value: tag,
                    label: tag,
                  }))}
                  isMulti
                  onChange={(newValue) =>
                    setTags(newValue.map((item) => item.value))
                  }
                  className="relative z-20"
                />
              )} */}
            </div>
            <div className="w-full">
              {isPostDataLoaded && (
                <Editor
                  content={data?.body}
                  editable={true}
                  onDataChange={(data) => {
                    setBody(data);
                  }}
                />
              )}
            </div>
            <button
              disabled={isLoadingUpdatePostDetail}
              type="button"
              onClick={handleUpdatePost}
              className="w-full px-4 py-2 font-semibold text-white bg-green-500 rounded-lg disabled:cursor-not-allowed disabled:opacity-70"
            >
              Update Post
            </button>
          </article>
        </section>
      )}
    </div>
  );
};

export default EditPost;
