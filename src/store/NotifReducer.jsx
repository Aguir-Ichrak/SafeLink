// Action Types
const FETCH_NOTIFICATIONS_SUCCESS = 'FETCH_NOTIFICATIONS_SUCCESS';

// Initial State
const initialState = {
    Notifications: [],
  };
 
  // Reducer Function
const NotifReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_NOTIFICATIONS_SUCCESS:
        return {
          ...state,
          Notifications: action.payload,
        };
      default:
        return state;
    }
  };

  // Action Creators
export const fetchNotificationsSuccess = (Notifications) => ({
    type: FETCH_NOTIFICATIONS_SUCCESS,
    payload: Notifications,
  });
  

  

  // Functions
export const fetchNotifications = (curentUser) => {
console.log('userrr',curentUser)
    return async (dispatch) => {
      try {
        const options = {
            method: 'GET',
          };
        const response = await fetch('https://safelink-fa263-default-rtdb.firebaseio.com/Notification.json',options);
        if (response.ok) {
          const data = await response.json();
            console.log(data); 
            const Notifications =  Object.entries(data).map(([key, value]) => ({ id:key, ...value })).filter(i=>i.key==curentUser.key);
            dispatch(fetchNotificationsSuccess(Notifications));
        }
         else {
       throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error(error);
      }
    };
  };
  


  
  export default NotifReducer;
