import React, {useState} from "react";
import Layout from "./Layout";
import {sendmail} from "../services/apiMail";

const Contacts = () => {
  const [values, setValues] = useState({
    email: "",
    text: "",
    error: "",
    success: false,
    loading: false,
  });

  const {email, text, error, success, loading} = values;

  const handleChange = name => event => {
    setValues({...values, error: false, [name]: event.target.value});
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({...values, error: false, loading: true});
    sendmail({email, text}).then(response => {
      if(response.status === 200){
        setValues({...values, success: true, loading: false})
      }
    })
      .catch(error => {
        setValues({...values, error: error.response.data.error, loading: false});
      });
  };

  const sendUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Message</label>
        <textarea
          onChange={handleChange("text")}
          rows="6"
          className="form-control"
          value={text}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-outline-secondary">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{display: error ? "" : "none"}}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const showSuccess = () => (
    <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
      Email was sent successfully
    </div>
  );

  return (
    <Layout
      title="Contacts"
      description="Send a message to the App developers"
      className="col-sm-6 offset-sm-2"
    >
      {showLoading()}
      {showSuccess()}
      {showError()}
      {sendUpForm()}
    </Layout>
  );
}

export default Contacts;



