import { Card, CardBody, Button, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPosts,
  addComment,
  reactToPost,
  addPost,
  fetchPostsSuccess,
} from "../../store/PostReducer";
import { BsSendPlus } from "react-icons/bs";
import UserAvatar from "../../images/user-avatar-32.png";
import { fetchUsers } from "../../store/UserReducer";

export default function PostsList() {
  const location = useLocation();
  // const { pathname } = location;
  const posts = useSelector((state) => {
    return state.posts.posts;
  });

  const users = useSelector((state) => {
    return state.users.users;
  });

  const dispatch = useDispatch();
  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", options);

    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      return formattedDate;
    }
  };

  //get
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);
  const curentUser = useSelector((state) => {
    return state.users.curentUser;
  });

  const CommentUserName = (key) => {
    let user = users.find((i) => i.id == key);
    return user ? user.name : "-";
  };
  const addNewComment = (data) => {
    dispatch(addComment(data));
  };
  const handelreactToPost = (data) => {
    dispatch(reactToPost(data));
  };
  const showComment = (index) => {
    posts[index].showComment = !posts[index].showComment;
  };

  const handleCommentChange = (e, post) => {
    post.newCommentText = e.target.value;
  };

  const [newpost, setNewPost] = useState({
    content: "",
    comment: [
      {
        text: "First comment",
        userKey: "-NtkUhtO8ekJmSkLIGE5",
        date: "--",
      },
    ],
    userKey: curentUser.id,
    date: null,
    like: 0,
    showComment: false,
    newCommentText: null,
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      newpost.date = new Date();
      await dispatch(addPost(newpost)).then((response) => {});
      dispatch(fetchPosts());
      setNewPost({
        content: "",
        comment: [
          {
            text: "First comment",
            userKey: "-NtkUhtO8ekJmSkLIGE5",
            date: "--",
          },
        ],
        userKey: curentUser.id,
        date: null,
        like: 0,
        showComment: false,
        newCommentText: null,
      });
    } catch (error) {
      console.error("Failed to add post:", error);
    }
  };

  const data = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newpost, [name]: value });
  };

  return (
    <div className="flex-1 flex pl-8 max-w-24 py-8 grid gap-6 grid-cols-6	px-4 w-full mx-auto">
      <div class="flex-1 col-span-2 sm:col-span-2">
        <div class="w-full">
          <div>
            <header class="mb-6">
              <h1 class="text-slate-800 dark:text-slate-100 font-bold cy709">
                All Posts ✨
              </h1>
            </header>

            <div class=" mb-6">
              <form class="relative">
                <Input
                  className="bg-white item-center dark:border-slate-700 border-slate-200 focus:bg-slate-200 py-2 px-3 text-sm focus:border-slate-200 hover:border-slate-200 focus:ring-transparent rounded text-slate-800 w-full dark:bg-slate-900 dark:focus:bg-slate-800 dark:focus:border-slate-600 dark:hover:border-slate-600 dark:hover:bg-slate-900"
                  type="search"
                  placeholder="Search…"
                />
              </form>
            </div>
          </div>

          <div class="bg-white justify-end	w-full dark:bg-slate-800 shadow-md rounded border border-slate-200 dark:border-slate-700 p-5 flex flex-col gap-6 ">
            <div className="bg-white w-full dark:bg-slate-800 dark:border-slate-700  gap-5 flex items-start ">
            <img
                      className="w-8 h-8 rounded-full"
                      src="src/images/signin.jpg"
                      width="20"
                      height="20"
                    />
              <div className="relative flex w-full item-center bg-slate-100 rounded grow">
                <Input
                  type="text"
                  name="content"
                  value={newpost.content}
                  onChange={data}
                  className="border-transparent focus:bg-white py-2 px-3 text-sm focus:border-slate-200 hover:border-slate-200 focus:ring-transparent rounded bg-slate-200 text-slate-800 w-full dark:bg-slate-900 dark:focus:bg-slate-800 dark:focus:border-slate-600 dark:hover:border-slate-600 dark:hover:bg-slate-900"
                  placeholder="What's happening?"
                />
              </div>
            </div>

            <div class="flex items-center justify-end	">
              <button
                type="submit"
                class=" p-1	rounded whitespace-nowrap bg-indigo-500 text-white font-semibold	text-xs	"
                onClick={handleSubmit}
                disabled={newpost.content === ""}
              >
                Send -&gt;
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="mx-8 clt4z flex-1 col-span-4 sm:col-span-4">
        {/* <div class="ch5dq"> */}
        {/* card */}
        <div className="overflow-x-auto h-full flex flex-col nowrap-flex item-center gap-4 ">
          {posts &&
            posts.map((post, index) => (
              <Card
                className="mb-1 w-96 w-80 p-6 bg-white dark:bg-slate-800 shadow-md rounded border border-slate-200 dark:border-slate-700 "
                key={"post" + index}
              >
                <CardBody variant="h5" color="blue-gray" className="p-0">
                  <div className="flex gap-5 items-center">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={UserAvatar}
                      width="32"
                      height="32"
                    />
                    <div>
                      <div className="text-sm text-slate-800 dark:text-slate-100 font-semibold">
                        {post && post.userKey
                          ? CommentUserName(post.userKey)
                          : null}
                      </div>
                      <div className="text-xs text-slate-500 ">
                        {post.date ? formatDate(post.date) : ""}
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-slate-800 dark:text-slate-100 cbfhc mb-3 mt-3 text-[#69717e]">
                    <p>{post.content}</p>{" "}
                  </div>
                </CardBody>

                <footer class="flex items-center">
                  <button
                    class="flex items-center    text-[#94a3b8] mr-4"
                    onClick={() =>
                      handelreactToPost({
                        post: post,
                        userComment: CommentUserName(curentUser.id),
                        userKey: curentUser.id,
                      })
                    }
                  >
                    <svg
                      class="fill-current	 shrink-0 mr-2  w-[1rem]"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14.682 2.318A4.485 4.485 0 0011.5 1 4.377 4.377 0 008 2.707 4.383 4.383 0 004.5 1a4.5 4.5 0 00-3.182 7.682L8 15l6.682-6.318a4.5 4.5 0 000-6.364zm-1.4 4.933L8 12.247l-5.285-5A2.5 2.5 0 014.5 3c1.437 0 2.312.681 3.5 2.625C9.187 3.681 10.062 3 11.5 3a2.5 2.5 0 011.785 4.251h-.003z"></path>
                    </svg>
                    <div class="text-sm text-slate-500 dark:text-slate-400">
                      {post.like}
                    </div>
                  </button>
                  <button
                    class="flex items-center    text-[#94a3b8]"
                    onClick={() => showComment(index)}
                  >
                    <svg
                      class="fill-current	 shrink-0 mr-2  w-[1rem]"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z"></path>
                    </svg>
                    <div class="text-sm text-slate-500 dark:text-slate-400">
                      {post.comment.length - 1}
                    </div>
                  </button>
                </footer>
                {post.showComment == true ? (
                  <div class="border-slate-200 dark:border-slate-700 mt-5	pt-3 border-t">
                    <ul class=" mb-2  dark:text-slate-400	">
                      {post.comment.map((com, indexC) =>
                        indexC > 0 ? (
                          <li class="rounded bg-slate-50 p-3 dark:bg-slate-900 li-m h-full">
                            <div class=" gap-5 flex items-start">
                              <img
                                className="w-8 h-8 rounded-full"
                                width="32"
                                height="32"
                                src={UserAvatar}
                                alt="User"
                              />
                              <div>
                                <div class="text-slate-500 text-xs">
                                  <a
                                    class="text-slate-800 dark:text-slate-100 font-semibold"
                                    href="#0"
                                  >
                                    {com && com.userKey
                                      ? CommentUserName(com.userKey)
                                      : null}
                                  </a>{" "}
                                  {com.date ? formatDate(com.date) : ""}
                                </div>
                                <div class="text-sm">{com.text}</div>
                              </div>
                            </div>
                          </li>
                        ) : null
                      )}
                    </ul>
                  </div>
                ) : (
                  ""
                )}

                <div className="pt-0 px-0">
                  <div className="  flex-row gap-3 flex items-center mt-3		">
                    <img
                      className="w-8 h-8 rounded-full"
                      src="src/images/signin.jpg"
                      width="20"
                      height="20"
                    />
                    <div className="relative flex w-full item-center bg-slate-100 rounded grow">
                      <Input
                        type="text"
                        name="comment"
                        value={post.newCommentText}
                        onInput={() => handleCommentChange(event, post)}
                        className="border-transparent focus:bg-white py-2 px-3 text-sm focus:border-slate-200 hover:border-slate-200 focus:ring-transparent rounded bg-slate-200 text-slate-800 w-full dark:bg-slate-900 dark:focus:bg-slate-800 dark:focus:border-slate-600 dark:hover:border-slate-600 dark:hover:bg-slate-900"
                        placeholder="Write a comment ..."
                      />
                      <Button
                        size="sm"
                        className="!absolute right-1 shadow-none"
                        onClick={() => {
                          if (post.newCommentText.trim() !== "") {
                            addNewComment({
                              commentData: {
                                text: post.newCommentText,
                                userKey: curentUser.id,
                                date: new Date(),
                              },
                              post: post,
                              userComment: CommentUserName(curentUser.id),
                            });
                          }
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "transparent",
                          }}
                        >
                          <BsSendPlus className="blue-color dark:text-slate-100 text-base	" />
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
