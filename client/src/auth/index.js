import http from "../http";

export const signup = user => {
 return http.post(`/signup`, user)
};

export const signin = user => {
  return http.post(`/signin`, user)
};

export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  }
};

export const signout = next => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
  } else {
    return false;
  }
};





