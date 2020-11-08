import http from "../http";

const upload = (userId, token, file, onUploadProgress) => {

  let formData = new FormData();
  formData.append("file", file);

  return http.post(`/file/${userId}`, formData, {
    headers: {
      "Authorization": `Bearer ${token}`
    },
    onUploadProgress,
  });
};

const getFiles = (userId, token, params) => {
  return http.get(`/files/${userId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      params
    }
  );
};

const download = (fileId, userId, token) => {
  return http.get(`/file/${fileId}/${userId}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    },
    responseType: 'blob',
  });
};

const deleteFile = (fileId, userId, token) => {
  return http.delete(`/file/${fileId}/${userId}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
};

export default {
  upload,
  getFiles,
  download,
  deleteFile
};





