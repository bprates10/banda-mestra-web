export const TOKEN_KEY = "@airbnb-Token";
export const MAIL = "@bandamestra-Email"
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
// export const isAuthenticated = true
export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const login = (token, email) => {

  // console.log('token => ', token.token)
  localStorage.setItem(TOKEN_KEY, token.token);

  localStorage.setItem(MAIL, email);

  // console.log('local storage -> ', localStorage.getItem(MAIL))
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(MAIL);
};