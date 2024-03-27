import {
    Card,
    CardBody,
    CardFooter,
    Button,
    Input
  } from "@material-tailwind/react";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts,addComment } from "../../store/PostReducer";
import PostModal from "./PostModal";
import { BsSendPlus } from "react-icons/bs";
import UserAvatar from "../../images/user-avatar-32.png"
import { fetchUsers } from "../../store/UserReducer";
export default function PostsList() {
    const posts = useSelector((state) => {return state.posts.posts});
    const users = useSelector((state) => {return state.users.users});
    const dispatch = useDispatch();

//get
useEffect(() => {
dispatch(fetchPosts());
dispatch(fetchUsers());
}, [dispatch]);
const curentUser = useSelector((state) => {return state.users.curentUser});

const CommentUserName = (key)=>{
let user = users.find(i=>i.id==key)
return user ? user.name : '-'
}
const addNewComment=(data)=>{
  dispatch(addComment(data))
}
  return (
    <div className="col-span-full xl:col-span-8  dark:bg-slate-800 shadow-lg  m-4 h-full">
      <header className="px-5 py-4 userHeader">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Posts List</h2>
        <PostModal  />
      </header>
        {/* card */}
        <div className="overflow-x-auto p-3 w-tab flex flex-col nowrap-flex item-center gap-4 "    
    >
     {Array.isArray(posts) && posts.map((post, index) => (
        <Card className="mt-6 w-96 w-70 p-6" key={index} > 
          <CardBody variant="h5" color="blue-gray" className="p-0"  >
          <div className="flex gap-5 items-center">
          <img className="w-8 h-8 rounded-full" src={UserAvatar} width="32" height="32" alt="User" />
          <div>
          <div className="text-sm text-slate-800 dark:text-slate-100 font-semibold">user name</div>
          <div className="text-xs text-slate-500 ">date time</div>

          </div>
          </div>
          <div className="text-sm text-slate-800 dark:text-slate-100 cbfhc mb-2 mt-2 text-[#69717e]"><p>{post.content}</p> </div>
        
          </CardBody>
       
          <footer class="flex items-center mb-3">
                                                <button class="flex items-center    text-[#94a3b8] mr-4">
                                                    <svg class="fill-current	 c7n6y mr-2  w-[1rem]" viewBox="0 0 16 16">
                                                        <path d="M14.682 2.318A4.485 4.485 0 0011.5 1 4.377 4.377 0 008 2.707 4.383 4.383 0 004.5 1a4.5 4.5 0 00-3.182 7.682L8 15l6.682-6.318a4.5 4.5 0 000-6.364zm-1.4 4.933L8 12.247l-5.285-5A2.5 2.5 0 014.5 3c1.437 0 2.312.681 3.5 2.625C9.187 3.681 10.062 3 11.5 3a2.5 2.5 0 011.785 4.251h-.003z"></path>
                                                    </svg>
                                                    <div class="text-sm text-slate-500 dark:text-slate-400">{post.like}</div>
                                                </button>
                                                
                                                <button class="flex items-center    text-[#94a3b8]">
                                                    <svg class="fill-current	 c7n6y mr-2  w-[1rem]" viewBox="0 0 16 16">
                                                        <path d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z"></path>
                                                    </svg>
                                                    <div class="text-sm text-slate-500 dark:text-slate-400">{post.comment.length-1}</div>
                                                </button>
                                            </footer>
                                            <div class="border-slate-200 dark:border-slate-700 ">
                                                <ul class=" mb-2">
                                                {post.comment.map((com, indexC) => ( 
                                                  indexC > 0 ?  
                                                  <li class="rounded">
                                                        <div class="flex cxbmt cb7d8">                                                  

                                                        <img className="w-8 h-8 rounded-full" src={UserAvatar} width="32" height="32" alt="User" />
                                                            <div>
                                                                <div class="text-slate-500 text-xs">
                                                                    <a class="text-slate-800 dark:text-slate-100 font-semibold" href="#0">{com && com.userKey ? CommentUserName(com.userKey):null}</a> {com.date}
                                                                </div>
                                                                <div class="text-sm">{com.text}</div>
                                                            </div>
                                                        </div>
                                                    </li>: null
                                               ))}
                                                  
                                                </ul>
                                                {/* <div class="flex cmgwo cwkb0">
                                                    <div class="text-sm text-slate-500 dark:text-slate-400"><span class="ch1ih c6w4h cw92y">2</span> of <span class="ch1ih c6w4h cw92y">67</span> comments</div>
                                                    <button class="text-sm text-indigo-500 cuv1l cdi3j cw92y">View More Comments</button>
                                                </div> */}
                                                
                                            </div>
         <CardFooter className="pt-0 ">
        <div className="relative flex w-full max-w-[24rem] item-center">
      
      <Input
        type="text"
        name="comment"
        onKeyDown={(e)=>{addNewComment({commentData:{text: e.target.value,userKey: curentUser.id,date: "--"},post:post})
      }
      }
        className="pr-20 rounded-md"
        containerProps={{
          className: "min-w-0 ",
        }}
      />
      <Button
        size="sm"
        // color={email ? "gray" : "blue-gray"}
        // disabled={!email}
        className="!absolute right-1 shadow-none"
      >
      <div
  style={{
    backgroundColor: "transparent",
  }}
>
  <BsSendPlus
className="blue-color"
style={{fontSize:"1rem"}}
  />
</div>
      </Button>
    </div> 
          {/* <Button className="blue-color" >Comment</Button> */}
        </CardFooter>
          </Card>

          ))}

        </div>
    

    </div>
     
  );
}

