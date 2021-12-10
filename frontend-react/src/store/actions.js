export const RECIPE_ADD = "RECIPE_ADD"
export const RECIPE_REMOVE = "RECIPE_REMOVE"
export const RECIPES_UPDATE = "RECIPES_UPDATE"
export const USER_LOGIN = "USER_LOGIN"
export const USER_LOGOUT = "USER_LOGOUT"
export const USER_UPDATE = "USER_UPDATE"

export const addRecipe = recipe => ({
    type: RECIPE_ADD,
    payload: recipe
})

export const removeRecipe = id => ({
    type: RECIPE_REMOVE,
    payload: id
})

export const updateRecipes = recipe => ({
    type: RECIPES_UPDATE,
    payload: recipe
})

export const loginUser = data => ({
    type: USER_LOGIN,
    payload: data
})

export const logoutUser = data => ({
    type: USER_LOGOUT
})

export const updateUser = data => ({
    type: USER_UPDATE,
    payload: data
})