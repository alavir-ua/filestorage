const {requireSignin, isAuth, isAdmin} = require('../controllers/auth');
const {userById, list, read, deleteUser} = require('../controllers/user');

module.exports = app => {

  app.get('/api/user/:userId', requireSignin, isAuth, read);

  app.get('/api/users/:userId', requireSignin, isAuth, isAdmin, list);

  app.delete('/api/user/:id/:userId', requireSignin, isAuth, isAdmin, deleteUser);

  app.param('userId', userById);

}





