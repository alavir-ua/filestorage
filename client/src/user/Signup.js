import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {signup} from '../auth';
import Layout from '../core/Layout';

const Signup = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    error: '',
    success: false
  });

  const {username, email, password, success, error} = values;

  const handleChange = name => event => {
    setValues({...values, error: false, [name]: event.target.value});
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({...values, error: false});
    signup({username, email, password}).then(response => {
        setValues({
          ...values,
          username: '',
          email: '',
          password: '',
          error: '',
          success: true
        });
        console.log(response.data)
      })
      .catch(error => {
        setValues({...values, error: error.response.data.error, success: false});
      });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={handleChange('username')} type="text" className="form-control" value={username}/>
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={handleChange('email')} type="email" className="form-control" value={email}/>
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={handleChange('password')} type="password" className="form-control" value={password}/>
      </div>
      <button onClick={clickSubmit} className="btn btn-outline-secondary">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
      {error}
    </div>
  );

  const showSuccess = () => (
    <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  );

  return (
    <Layout
      title="Signup"
      description="Signup to React Node files storage App"
      className="col-sm-6 offset-sm-2"
    >
      {showSuccess()}
      {showError()}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;





