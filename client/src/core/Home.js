import React from "react";
import {Link} from "react-router-dom"

const Home = () => {
  return (
    <div className="col-md-10">
      <div className="jumbotron">
        <h2>React Node files storage App</h2>
        <hr/>
        <p className="lead">File storage implementation in MySOL database with server side encryption.<br/> The
          application is implemented in React as a client and Node.js (Express) as a server.<br/> The application
          allows
          you to upload, download and delete files from the database. Supported file types for uploading and
          downloading: 7z, zip, gif, epub, docx, mp3, pdf, xlsx, jpg, txt, fb2, png, wav and others.<br/>
          The size of the downloaded files is limited by your database configuration.</p>
        <br/>
        <Link
          className="btn btn-outline-secondary"
          to="/signup"
        >
          Continue...
        </Link>
      </div>
    </div>
  );
};

export default Home;





