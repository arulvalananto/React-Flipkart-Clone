export const initialState = {
  isLogin: false,
  user: ''
};

export const actionTypes = {
  TOGGLE_LOGIN : 'TOGGLE_LOGIN',
  SET_USER: 'SET_USER',
}

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_LOGIN:
      return {
        ...state,
        isLogin: action.condition
      }
      case actionTypes.SET_USER:
        return {
          ...state,
          user: action.user
        }
    default:
      return state;
  }
};
