export const getJwt = () => {
  return localStorage.getItem('jwtToken');
};

export const removeJwt = () => {
  localStorage.removeItem('jwtToken');
};
