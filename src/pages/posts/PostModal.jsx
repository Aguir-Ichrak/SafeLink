import React, { useState } from "react";
import { Card, Textarea} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, fetchPosts } from "../../store/PostReducer";
import { RiEdit2Fill } from "react-icons/ri";
 function PostModal() {
  const curentUser = useSelector((state) => {return state.users.curentUser});

  const [post, setPost] = useState({
    content: "",
    comment: [],
    userKey:curentUser.key,
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await dispatch(addPost(post)).then((response) => {
        console.log("response---", response);
      });
      dispatch(fetchPosts());
      setShowModal(false);
      setPost({
        content: "",
        comment: [],
      });
    } catch (error) {
      console.error("Failed to add post:", error);
    }
  };

  const data = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const [showModal, setShowModal] = useState(false);
  return (
    <>
  <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white"         
                     onClick={() => setShowModal(true)}>
                    <img src='src/images/addd.png' className="w-5 h-5 fill-current opacity-50 shrink-0"/>
                    <span className="hidden xs:block ml-2">Add Post</span>
                </button> 
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-35 justify-self-center">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none w-full">
              {/*header*/}
              <div className="flex justify-between p-5 rounded-t self-center gap-4">
                <h3 className="text-3xl font-semibold blue-color" >New Post</h3>
                <div className="self-center"
  style={{
    backgroundColor: "transparent",
    fontSize:"x-large"
  }}
>
  <RiEdit2Fill
className="blue-color"
  />
</div>
            </div>
              {/*body*/}
              <Card
                color="transparent"
                shadow={false}
                className="flex flex-col nowrap-flex item-center "
              >
                  <div className="flex items-center justify-end pt-4 rounded-b text-center w-full nowrap-flex flex-col" >
                    <Textarea
                    placeholder="Your Comment"
                    name="content"
                    rows={8}
                    value={post.content}
                    onChange={data}
                    className="w-90 mb-4"
                  />
    <div className="flex flex-row w-90 justify-end mb-4" >
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setPost({
                          content: "",
                          comment: [],
                        });
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm p-05 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                      type="submit"
                      onClick={handleSubmit}
                      disabled={post.content === ''}
                                          >
                      Add Your New Post
                    </button>
                    </div>
                  </div>
              </Card>
              {/*footer*/}
            </div>
          </div>
          {/* </div> */}
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default PostModal;
