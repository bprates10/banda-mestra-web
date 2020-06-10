export const TOKEN_KEY = "@bandamestra-Token";
export const MAIL = "@bandamestra-Email"
// export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const isAuthenticated = true
export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const login = (token, email) => {
  localStorage.setItem(TOKEN_KEY, token);

  sessionStorage.setItem('MAIL', email);


};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem('MAIL');
};