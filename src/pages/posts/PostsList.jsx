import {
    Card,
    CardBody,
    CardFooter,
    Button,
    Input
  } from "@material-tailwind/react";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from "../../store/PostReducer";
import PostModal from "./PostModal";
import { BsSendPlus } from "react-icons/bs";

export default function PostsList() {
    const posts = useSelector((state) => {return state.posts.posts});
    const dispatch = useDispatch();

//get
useEffect(() => {
dispatch(fetchPosts());
}, [dispatch]);
   

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg  m-4 h-full">
      <header className="px-5 py-4 userHeader">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Posts List</h2>
        <PostModal  />
      </header>
        {/* card */}
        <div className="overflow-x-auto p-3 w-tab flex flex-col nowrap-flex item-center gap-4 "    
    >
     {Array.isArray(posts) && posts.map((post, index) => (
        <Card className="mt-6 w-96 w-70" key={index}> 
          <CardBody variant="h5" color="blue-gray" style={{padding: "0.5rem 1rem"}} >
          {post.content} 
        
          </CardBody>
        <CardFooter className="pt-0 ">
        <div className="relative flex w-full max-w-[24rem] item-center">
      <Input
        type="text"
        name="comment"
        value={post.comment}
        // onChange={onChange}
        className="pr-20 rounded-lg"
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

