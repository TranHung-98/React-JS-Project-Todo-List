
const initState = {
  users: [],
  posts: []
}

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(item => item.id !== action.payload.id)
      };
    case 'CREATE_USER':
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case 'GET_DATA_SUCCESS':
      return {
        ...state,
        users: action.payload
      };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.payload.userId) {
            return {
              ...user,
              ...action.payload.updatedUserData,
            };
          }
          return user;
        }),
      };
    default:
      return state;
  }
}

export default rootReducer;
