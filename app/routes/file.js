const {uploadFile, listAllFiles, downloadFile, deleteFile} = require('../controllers/file.js');
const {requireSignin, isAuth, isOwner} = require('../controllers/auth');
const {userById} = require('../controllers/user');
const {fileById} = require('../controllers/file');

module.exports = (app, upload) => {

  app.post('/api/file/:userId', requireSignin, isAuth, upload.single('file'), uploadFile);

  app.get('/api/files/:userId', requireSignin, isAuth, listAllFiles);

  app.get('/api/file/:fileId/:userId', requireSignin, isAuth, isOwner, downloadFile);

  app.delete('/api/file/:fileId/:userId', requireSignin, isAuth, isOwner, deleteFile);

  app.param('userId', userById);
  app.param('fileId', fileById);

}





