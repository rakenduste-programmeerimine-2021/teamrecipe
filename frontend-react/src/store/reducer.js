import { RECIPE_ADD, RECIPE_REMOVE, RECIPES_UPDATE, USER_LOGIN, USER_LOGOUT, USER_UPDATE } from "./actions";

const recipeReducer = (state, action) => {
  switch(action.type){
    case RECIPE_ADD:
      return {
        ...state,
        data: state.data.concat(action.payload)
      };
    case RECIPE_REMOVE:
      return {
        ...state,
        data: state.data.filter(recipe => recipe.recipeID !== action.payload)
      }
    case RECIPES_UPDATE:
      const newData = [];
        return {
          ...state,
          data: newData.concat(action.payload)
        }
    default:
      return state;
  }
}

const authReducer = (state, action) => {
  switch(action.type){
    case USER_LOGIN:
      return {
        ...state,
        username: action.payload.username,
        token: action.payload.token
      }
    case USER_LOGOUT:
      return {
        ...state,
        username: null,
        token: null
      }
    case USER_UPDATE:
      const newData = [];
        return {
          ...state,
          data: newData.concat(action.payload)
        }
    default:
      return state
  }
}

export { recipeReducer, authReducer }