import http from "../http";

const getUsers = (userId, token, params) => {
  return http.get(`/users/${userId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      params
    }
  );
};

const deleteUser = (userId, adminId, token) => {
  return http.delete(`/user/${userId}/${adminId}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
};

export default {
  getUsers,
  deleteUser
};


