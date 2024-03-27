// Action Types
const FETCH_BUILDINGS_SUCCESS = 'FETCH_BUILDINGS_SUCCESS';
const ADD_BUILDING_SUCCESS = 'ADD_BUILDING_SUCCESS';
const DELETE_BUILDING_SUCCESS = 'DELETE_BUILDINGS_SUCCESS';
const EDIT_BUILDING_SUCCESS = 'EDIT_BUILDING_SUCCESS';

// Initial State
const initialState = {
    buildings: [],
  };
 
  // Reducer Function
const BuildingReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BUILDINGS_SUCCESS:
        console.log ("ftch",action.payload)
        return {
          ...state,
          buildings: action.payload,
        };
      case ADD_BUILDING_SUCCESS:
        return {
          ...state,
          buildings: [...state.buildings, action.payload],
        };
      case DELETE_BUILDING_SUCCESS:
        return {
          ...state,
          buildings: state.buildings.filter(building => building.id !== action.payload),
        };
        case EDIT_BUILDING_SUCCESS:
          return {
            ...state,
            building: [...state.buildings, action.payload],
          };
      default:
        return state;
    }
  };

  // Action Creators
export const fetchBuildingsSuccess = (buildings) => ({
    type: FETCH_BUILDINGS_SUCCESS,
    payload: buildings,
  });
  
  export const addBuildingSuccess = (building) => ({
    type: ADD_BUILDING_SUCCESS,
    payload: building,
  });
  
  export const deleteBuildingSuccess = (buildingId) => ({
    type: DELETE_BUILDING_SUCCESS,
    payload: buildingId,
  });

  export const editBuildingSuccess = (building) => ({
    type: EDIT_BUILDING_SUCCESS,
    payload: building,
  });

  // Functions
export const fetchBuildings = () => {
    return async (dispatch) => {
      try {
        const options = {
            method: 'GET',
          };
        const response = await fetch('https://safelink-fa263-default-rtdb.firebaseio.com/BuildingData.json',options);
        if (response.ok) {
          const data = await response.json();
            console.log(data); 
            const buildingsArray =  Object.entries(data).map(([key, value]) => ({ id:key, ...value }));
            dispatch(fetchBuildingsSuccess(buildingsArray));
            console.log(buildingsArray);    
        }
         else {
       throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error(error);
      }
    };
  };
  

export const addBuilding = (building) => {
    return async () => {
      try {
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(building),
        };
        const response = await fetch('https://safelink-fa263-default-rtdb.firebaseio.com/BuildingData.json', options);
        // if (response.ok) {
            // const data = await response.json();
            // dispatch(addUserSuccess({ id: data.name, ...user })); 
    //  }

      } catch (error) {
        console.error(error);
      }
      
    };

}
  
  export const deleteBuilding = (buildingId) => {
    return async (dispatch) => {
      try {
        const options = { method: 'DELETE' };
        const response = await fetch(`https://safelink-fa263-default-rtdb.firebaseio.com/UserData/${buildingId}.json`, options);
        if (response.ok) {
            dispatch(deleteBuildingSuccess(buildingId));
                }
      } catch (error) {
        console.error(error);
      }
    };
  };

  export const editBuilding = (id, newData) => {
    return async (dispatch) => {
      try {
        const options = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newData),
        };
        const response = await fetch(`https://safelink-fa263-default-rtdb.firebaseio.com/BuildingData/${id}.json`, options);
        if (response.ok) {
          const updatedBuilding = await response.json(); 
          dispatch(editBuildingSuccess(updatedBuilding));         
        } else {
          console.error('Failed to edit user. Server returned:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Failed to edit user:', error);
      }
    };
  };

  
  export default BuildingReducer;
