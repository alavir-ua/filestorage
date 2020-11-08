import http from "../http";

export const sendmail  = mail => {
  return http.post('/sendmail', mail)
};





