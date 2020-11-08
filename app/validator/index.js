exports.userSignupValidator = (req, res, next) => {
  req.check('username', 'Name is required').notEmpty();
  req.check('username')
    .isLength({min: 3})
    .withMessage('Name must contain at least 3 characters')
  req.check('email', 'Email is required').notEmpty();
  req.check('email', 'Email is`t valid').isEmail();
  req.check('password', 'Password is required').notEmpty();
  req.check('password')
    .isLength({min: 6})
    .withMessage('Password must contain at least 6 characters')
    .matches('[0-9]')
    .withMessage('Password must contain a number')
    .matches('[A-Z]')
    .withMessage('Password must contain an uppercase letter');
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({error: firstError});
  }
  next();
};

exports.userSendMailValidator = (req, res, next) => {
  req.check('email', 'Email is required').notEmpty();
  req.check('email', 'Email is`t valid').isEmail();
  req.check('text', 'Text is required').notEmpty();
  req.check('text')
    .matches('[a-z]')
    .withMessage('Text must contain an uppercase letter');
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({error: firstError});
  }
  next();
};





