import React, {Fragment, useCallback, useEffect, useState} from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import userService from "../services/apiAdmin";
import Notification from "../core/Notification";
import alert from "../helpers/confirmAlert";
import Pagination from "@material-ui/lab/Pagination";
import moment from 'moment';
import 'moment/locale/en-gb';
moment.locale('en-gb');

const UserDashboard = () => {
  const [message, setMessage] = useState(null);
  const [usersInfo, setUsersInfo] = useState([]);
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
      params["username"] = searchName;
    }
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrieveUsersInfo = useCallback(() => {
    const params = getRequestParams(searchName, page, 5);
    userService.getUsers(user.id, token, params)
      .then((response) => {
        const {items, totalPages} = response.data;
        setUsersInfo(items);
        setCount(totalPages);
      })
      .catch((err) => {
        setMessage(err.message);
      });
  }, [page, searchName, user.id, token])


  const deleteUser = userId => {
    userService.deleteUser(userId, user.id, token)
      .then((res) => {
        setMessage(res.data.message);
        setSuccess(true);

        setTimeout(() => {
          setMessage(null);
        }, 4000)

        retrieveUsersInfo();
      })
      .catch((err) => {
        setMessage(err.message || "Some error occurred while deleting user!");
        setSuccess(false);

        setTimeout(() => {
          setMessage(null)
        }, 4000)
      });
  }

  useEffect(retrieveUsersInfo, [page, searchName, retrieveUsersInfo]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const description = `Dear ${user.username}, here you can manage users`;

  const usersList = () => (
    usersInfo.length !== 0 ? (
      <Fragment>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by username"
            value={searchName}
            onChange={onChangeSearchName}
          />
        </div>

        <Notification message={message} success={success}/>

        <div className="card">
          <div className="card-header">List of Users</div>
          <div className="card-body">
            <table className="table table-active text-dark">
              <thead>
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Email</th>
                <th>Registered</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {usersInfo && (
                usersInfo.map((user, index) => (
                    <tr key={index}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{moment(user.createdAt).format('LLL')}</td>
                      <td>
                        <button className="btn" style={{color: 'red'}}
                                onClick={() => alert(user.id, user.username, deleteUser)}><i
                          className="fa fa-trash"></i>
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
      title="Admin Dashboard"
      description={description}
      className="col-sm-8 offset-sm-1"
    >
      {usersList()}
    </Layout>
  );
};

export default UserDashboard;



