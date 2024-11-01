const addUser = (user) => ({
  type: "ADD_USER",
  payload: user,
});

const removeUser = (userId) => ({
  type: "REMOVE_USER",
  payload: userId,
});

const updateUser = (user) => ({
  type: "UPDATE_USER",
  payload: user,
});

export { addUser, removeUser, updateUser };
