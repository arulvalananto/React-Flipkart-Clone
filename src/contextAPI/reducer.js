export const initialState = {
   isLogin: false,
   user: "",
   deliveryAddresses: [],
   userName: ""
};

export const actionTypes = {
   TOGGLE_LOGIN: "TOGGLE_LOGIN",
   SET_USER: "SET_USER",
   ADD_DELIVERY_ADDRESS: "ADD_DELIVERY_ADDRESS",
   SET_USERNAME: "SET_USERNAME"
};

export const reducer = (state, action) => {
   switch (action.type) {
      case actionTypes.TOGGLE_LOGIN:
         return {
            ...state,
            isLogin: action.condition,
         };
      case actionTypes.SET_USER:
         return {
            ...state,
            user: action.user,
         };
      case actionTypes.ADD_DELIVERY_ADDRESS:
         const updatedDeliveryAddresses = [...state.deliveryAddresses, action.deliveryAddress ]
         return {
            ...state,
            deliveryAddresses: updatedDeliveryAddresses
         };
      case actionTypes.SET_USERNAME: 
         return {
            ...state,
            username: action.username
         }
      default:
         return state;
   }
};
