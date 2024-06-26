// Action Types
const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
const ADD_COMMENT_SUCCES = "ADD_COMMENT_SUCCES";
const LLIKE_COMMENT_SICCES = "LLIKE_COMMENT_SICCES";
// Initial State
const initialState = {
  posts: [],
  curentPost: localStorage.getItem("curentPost")
    ? localStorage.getItem("curentPost")
    : null,
};

// Reducer Function
const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      console.log("fatchhh", action.payload);
      let posts=action.payload
      return {
        ...state,
        posts: posts,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case ADD_COMMENT_SUCCES:
      console.log('add comment succes',state.posts,action.payload)
      let data = state.posts.map((i) => {
        if (i.id == action.payload.id) {
          console.log('here add comment')
          i.comment = action.payload.comment;
          i.newCommentText = '';
          return i
        }else{
          return i
        }
      });
      console.log('add comment succes data',data)

      return {
        ...state,
        posts: data,
      };
    case  LLIKE_COMMENT_SICCES:
      let likeData = state.posts.map((i) => {
        if (i.id == action.payload.id) {
          i.like = action.payload.like;
          return i
        }else{
          return i
        }
      });

      return {
        ...state,
        posts: likeData,
      };
    default:
      return state;
  }
};

// Action Creators
export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const addPostSuccess = (post) => ({
  type: ADD_POST_SUCCESS,
  payload: post,
});

export const deletePostSuccess = (postId) => ({
  type: DELETE_POST_SUCCESS,
  payload: postId,
});
export const editPostSuccess = (payload) => ({
  type: ADD_COMMENT_SUCCES,
  payload: payload,
});
export const editLikeSuccess = (payload) => ({
  type: LLIKE_COMMENT_SICCES,
  payload: payload,
});

// Functions
export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      const options = {
        method: "GET",
      };
      const response = await fetch(
        "https://safelink-fa263-default-rtdb.firebaseio.com/PostData.json",
        options
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const postsArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        dispatch(fetchPostsSuccess(postsArray));
        console.log(postsArray);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const addPost = (post) => {
  return async () => {
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      };
      const response = await fetch(
        "https://safelink-fa263-default-rtdb.firebaseio.com/PostData.json",
        options
      );
      if (response.ok) {
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      const options = { method: "DELETE" };
      const response = await fetch(
        `https://safelink-fa263-default-rtdb.firebaseio.com/PostData/${postId}.json`,
        options
      );
      if (response.ok) {
        dispatch(deletePostSuccess(postId));
      }
    } catch (error) {
      console.error(error);
    }
  };
};
export const addComment = (data) => {
  return async (dispatch) => {
    try {
      let body = data.post;
      body.comment.push(data.commentData);
      body.newCommentText=null
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };
      const response = await fetch(
        `https://safelink-fa263-default-rtdb.firebaseio.com/PostData/${data.post.id}.json`,
        options
      );
      if (response.ok) {
        const updatedPost = await response.json();
        dispatch(editPostSuccess(updatedPost));
        if(data.post.userKey!==data.commentData.userKey){
           let notifData={date:new Date(),message:data.userComment+' Commanted your poste',title:'Comment',icon:'comment',userKey:data.post.userKey}
        const options2 = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(notifData),
        };
        const response2 = await fetch(
          "https://safelink-fa263-default-rtdb.firebaseio.com/Notification.json",
          options2
        );
        }
       
        //call api to send notification
      } else {
        console.error(
          "Failed to add comment. Server returned:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Failed to edit comment:", error);
    }
  };
};
export const reactToPost =(data) => {
  let body = data.post
  body.newCommentText=null
  body.like =  body.like+1;
  return async (dispatch) => {
    try {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };
      const response = await fetch(
        `https://safelink-fa263-default-rtdb.firebaseio.com/PostData/${data.post.id}.json`,
        options
      );
      if (response.ok) {
        const updatedPost = await response.json();
        dispatch(editLikeSuccess(updatedPost));
        //call api to send notification
        if(data.post.userKey!==data.userKey){
          let notifData={date:new Date(),message:data.userComment+' liked your poste',title:'Like',icon:'like',userKey:data.post.userKey}
       const options2 = {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(notifData),
       };
       const response2 = await fetch(
         "https://safelink-fa263-default-rtdb.firebaseio.com/Notification.json",
         options2
       );
       }
      } else {
        console.error(
          "Failed to add comment. Server returned:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Failed to edit comment:", error);
    }
  };
};
export default PostReducer;
