// Action Types
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
const SIGN_IN_USER_SUCCESS ='SIGN_IN_USER_SUCCESS'
const LOG_OUT_USER_SUCCESS ='LOG_OUT_USER_SUCCESS'
const EDIT_CURENT_USER_SUCCESS = 'EDIT_CURENT_USER_SUCCESS'
// Initial State
const initialState = {
    users: [],
    curentUser:localStorage.getItem('curentUser') ?JSON.parse(localStorage.getItem('curentUser')):null 
  };
 
  // Reducer Function
const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USERS_SUCCESS:
        return {
          ...state,
          users: action.payload,
        };
      case ADD_USER_SUCCESS:
        return {
          ...state,
          users: [...state.users, action.payload],
        };
      case DELETE_USER_SUCCESS:
        return {
          ...state,
          users: state.users.filter(user => user.id !== action.payload),
        };
        case EDIT_USER_SUCCESS:
          return {
            ...state,
            users: [...state.users, action.payload],
          };
          case SIGN_IN_USER_SUCCESS:
            console.log('action in curent user')
            localStorage.setItem('curentUser',JSON.stringify(action.payload))
          return {
            ...state,
            curentUser: action.payload,
          };
          case LOG_OUT_USER_SUCCESS:
            localStorage.removeItem('curentUser')
          return {
            ...state,
            curentUser: null,
          };
          case EDIT_CURENT_USER_SUCCESS:
            localStorage.setItem('curentUser',JSON.stringify(action.payload))
            return {
              ...state,
              curentUser: action.payload,
            };
          
      default:
        return state;
    }
  };

  // Action Creators
export const fetchUsersSuccess = (users) => ({
    type: FETCH_USERS_SUCCESS,
    payload: users,
  });
  
  export const addUserSuccess = (user) => ({
    type: ADD_USER_SUCCESS,
    payload: user,
  });
  
  export const deleteUserSuccess = (userId) => ({
    type: DELETE_USER_SUCCESS,
    payload: userId,
  });

  export const editUserSuccess = (user) => ({
    type: EDIT_USER_SUCCESS,
    payload: user,
  });
  export const editCurentUserSuccess = (user) => ({
    type: EDIT_CURENT_USER_SUCCESS,
    payload: user,
  });
  export const signInSuccess = (user) => ({
    type: SIGN_IN_USER_SUCCESS,
    payload: user,
  });
  export const logOutSuccess = () => ({
    type: LOG_OUT_USER_SUCCESS
  });
 
  // Functions
export const fetchUsers = () => {
    return async (dispatch) => {
      try {
        const options = {
            method: 'GET',
          };
        const response = await fetch('https://safelink-fa263-default-rtdb.firebaseio.com/UserData.json',options);
        if (response.ok) {
          const data = await response.json();
            console.log(data); 
            const usersArray =  Object.entries(data).map(([key, value]) => ({ id:key, ...value }));
            dispatch(fetchUsersSuccess(usersArray));
            console.log(usersArray);    
          // setUsers(usersArray);
        }
         else {
       throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error(error);
      }
    };
  };
  

export const addUser = (user) => {
    return async () => {
      try {
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        };
        const response = await fetch('https://safelink-fa263-default-rtdb.firebaseio.com/UserData.json', options);
        if (response.ok) {
            // const data = await response.json();
            // dispatch(addUserSuccess({ id: data.name, ...user })); 
     }

      } catch (error) {
        console.error(error);
      }
      
    };

}
  
  export const deleteUser = (userId) => {
    return async (dispatch) => {
      try {
        const options = { method: 'DELETE' };
        const response = await fetch(`https://safelink-fa263-default-rtdb.firebaseio.com/UserData/${userId}.json`, options);
        if (response.ok) {
            dispatch(deleteUserSuccess(userId));
                }
      } catch (error) {
        console.error(error);
      }
    };
  };

  export const editUser = (id, newData) => {
    return async (dispatch) => {
      try {
        const options = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newData),
        };
        const response = await fetch(`https://safelink-fa263-default-rtdb.firebaseio.com/UserData/${id}.json`, options);
        if (response.ok) {
          const updatedUser = await response.json(); 
          dispatch(editUserSuccess(updatedUser));         
        } else {
          console.error('Failed to edit user. Server returned:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Failed to edit user:', error);
      }
    };
  };

export const singIn = (userData)=>{
  
  return async (dispatch) => {
    try {
      const options = {
          method: 'GET',
        };
      const response = await fetch('https://safelink-fa263-default-rtdb.firebaseio.com/UserData.json',options);
      if (response.ok) {
        const data = await response.json();
        const usersArray = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
        // Find the user with the provided email
        console.log('test',userData)
        const user = usersArray.find(user => user.email === userData.email &&  user.password === userData.password && user.active==true);

        // Check if the user exists and the password matches
        if (user ) {
          // Dispatch action for successful sign-in
          dispatch(signInSuccess(user));
          console.log('User signed in successfully');
          return response
        } else {
          // Dispatch action for failed sign-in
          // dispatch(signInFailure('Invalid email or password'));
          console.log('Invalid email or password');
        }
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error(error);
    }
  };
}
export const logOut = ()=>{
  return async (dispatch) => {

dispatch(logOutSuccess())}
}
export const editCurrentUser = (id, newData) => {
  return async (dispatch) => {
    try {
      const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      };
      const response = await fetch(`https://safelink-fa263-default-rtdb.firebaseio.com/UserData/${id}.json`, options);
      if (response.ok) {
        const updateCurentUser = await response.json(); 
        dispatch(editCurentUserSuccess(updateCurentUser));         
      } else {
        console.error('Failed to edit curent user. Server returned:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Failed to edit user:', error);
    }
  };
};




  
  export default userReducer;
