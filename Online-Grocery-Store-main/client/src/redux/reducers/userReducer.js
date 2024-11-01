const initialState = {
  users: [
    {
      id: "c1",
      name: "abhi",
      type: "storemanager",
      password: "1234",
    },
  ],
  currentUserId: 0,
};

const userReducer = (state = initialState, action) => {
  console.log("userReducer", action);
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
        currentUserId: state.currentUserId + 1,
      };
    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? { ...user, ...action.payload } : user
        ),
      };
    default:
      return state;
  }
};

export default userReducer;
