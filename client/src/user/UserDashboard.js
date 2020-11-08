import React, {useState, useEffect, useCallback, Fragment} from "react";
import Pagination from "@material-ui/lab/Pagination";
import fileService from "../services/apiFile";
import fileDownload from 'js-file-download';
import Notification from "../core/Notification";
import {isAuthenticated} from '../auth';
import Layout from "../core/Layout";
import alert from '../helpers/confirmAlert';
import moment from 'moment';
import 'moment/locale/en-gb'
moment.locale('en-gb');

const UserDashboard = () => {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(null);
  const [fileInfos, setFileInfos] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [success, setSuccess] = useState(false);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const {user, token} = isAuthenticated();

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const getRequestParams = (searchName, page, pageSize) => {
    let params = {};
    if (searchName) {
      params["name"] = searchName;
    }
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrieveFilesInfo = useCallback(() => {
    const params = getRequestParams(searchName, page, 5);
    fileService.getFiles(user.id, token, params)
      .then((response) => {
        const {items, totalPages} = response.data;
        setFileInfos(items);
        setCount(totalPages);
      })
      .catch((err) => {
        setMessage(err.message);
      });
  }, [page, searchName, user.id, token])

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
  };

  const upload = () => {
    let currentFile = selectedFiles[0];

    setProgress(0);
    setCurrentFile(currentFile);

    fileService.upload(user.id, token, currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        setSuccess(true);

        setTimeout(() => {
          setMessage(null);
          setCurrentFile(undefined);
        }, 2000)

        retrieveFilesInfo();
      })
      .catch((err) => {
        setProgress(0);
        setMessage(err.message || "Some error occurred while uploading file!");
        setSuccess(false);

        setTimeout(() => {
          setMessage(null)
        }, 2000)

        setCurrentFile(undefined);
      });

    setSelectedFiles(undefined);
  };

  const download = (fileId, filename) => {
    fileService.download(fileId, user.id, token)
      .then((res) => {
        fileDownload(res.data, filename)
      })
      .catch((err) => {
        setMessage(err.message || "Some error occurred while downloading file!");
      });
  }

  const deleteFile = fileId => {
    fileService.deleteFile(fileId, user.id, token)
      .then((res) => {
        setMessage(res.data.message);
        setSuccess(true);

        setTimeout(() => {
          setMessage(null);
          setCurrentFile(undefined);
        }, 4000)

        retrieveFilesInfo();
      })
      .catch((err) => {
        setMessage(err.message || "Some error occurred while downloading file!");
        setSuccess(false);

        setTimeout(() => {
          setMessage(null)
        }, 4000)
      });
  }

  useEffect(retrieveFilesInfo, [page, searchName, retrieveFilesInfo]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const description = `Dear ${user.username}, here you can manage files`;

  const uploadField = () => (
    <Fragment>
      {currentFile && (
        <div className="progress">
          <div
            className="progress-bar progress-bar-info progress-bar-striped"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{width: progress + "%"}}
          >
            {progress}%
          </div>
        </div>
      )
      }
      <h3 className="heading">
        <label className="btn btn-default">
          <input type="file" onChange={selectFile} name="file"/>
        </label>
        <button
          className="btn btn-success"
          disabled={!selectedFiles}
          onClick={upload}
        >
          Upload
        </button>
      </h3>
      <Notification message={message} success={success}/>
    </Fragment>
  )

  const filesList = () => (
    fileInfos.length !== 0 ? (
      <Fragment>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by filename"
            value={searchName}
            onChange={onChangeSearchName}
          />
        </div>

        <div className="card">
          <div className="card-header">List of Files</div>
          <div className="card-body">
            <table className="table table-active text-dark">
              <thead>
              <tr>
                <th>Filename</th>
                <th>File size</th>
                <th>Uploaded at</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {fileInfos && (
                fileInfos.map((file, index) => (
                    <tr key={index}>
                      <td>{file.name}</td>
                      <td>{file.size}</td>
                      <td>{moment(file.createdAt).format('LLL')}</td>
                      <td>
                        <button className="btn" style={{color: 'red'}} onClick={() => alert(file.id, file.name, deleteFile)}><i
                          className="fa fa-trash"></i>
                        </button>


                        <button className="btn btnw" style={{color: 'blue'}} onClick={() => download(file.id, file.name)}>
                          <i
                            className="fa fa-cloud-download"></i>
                        </button>
                      </td>
                    </tr>
                  )
                )
              )}
              </tbody>
            </table>

            <div className="mt-3">
              <Pagination
                className="group my-3"
                count={count}
                page={page}
                siblingCount={1}
                boundaryCount={1}
                variant="outlined"
                shape="rounded"
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </Fragment>
    ) : (
      <div className="input-group">
        <h5>No files yet...</h5>
      </div>
    )
  )

  return (
    <Layout
      title="File storage"
      description={description}
      className="col-sm-8 offset-sm-1"
    >
      {uploadField()}
      <hr/>
      {filesList()}
    </Layout>
  );
};

export default UserDashboard;
