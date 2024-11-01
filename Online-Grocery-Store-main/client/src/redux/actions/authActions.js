const login = (user) => ({
  type: "LOGIN",
  payload: user,
});

const logout = () => ({
  type: "LOGOUT",
  payload: {},
});

export { login, logout };
