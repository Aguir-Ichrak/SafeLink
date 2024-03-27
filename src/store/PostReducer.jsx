// Action Types
const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';

// Initial State
const initialState = {
    posts: [],
    curentPost:localStorage.getItem('curentPost') ?localStorage.getItem('curentPost'):null 
  };
 
  // Reducer Function
const PostReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_POSTS_SUCCESS:
        console.log ("fatchhh",action.payload)
        return {
          ...state,
          posts: action.payload,
        };
      case ADD_POST_SUCCESS:
        return {
          ...state,
          posts: [...state.posts, action.payload],
        };
      case DELETE_POST_SUCCESS:
        return {
          ...state,
          posts: state.posts.filter(post => post.id !== action.payload),
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

 
  // Functions
export const fetchPosts = () => {
    return async (dispatch) => {
      try {
        const options = {
            method: 'GET',
          };
        const response = await fetch('https://safelink-fa263-default-rtdb.firebaseio.com/PostData.json',options);
        if (response.ok) {
          const data = await response.json();
            console.log(data); 
            const postsArray =  Object.entries(data).map(([key, value]) => ({ id:key, ...value }));
            dispatch(fetchPostsSuccess(postsArray));
            console.log(postsArray);    
        }
         else {
       throw new Error('Failed to fetch data');
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
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(post),
        };
        const response = await fetch('https://safelink-fa263-default-rtdb.firebaseio.com/PostData.json', options);
        if (response.ok) {
     }

      } catch (error) {
        console.error(error);
      }
      
    };

}
  
  export const deletePost = (postId) => {
    return async (dispatch) => {
      try {
        const options = { method: 'DELETE' };
        const response = await fetch(`https://safelink-fa263-default-rtdb.firebaseio.com/PostData/${postId}.json`, options);
        if (response.ok) {
            dispatch(deletePostSuccess(postId));
                }
      } catch (error) {
        console.error(error);
      }
    };
  };
  
  export default PostReducer;
