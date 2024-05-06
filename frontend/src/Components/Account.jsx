import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { httpFile } from "../../config/axiosConfig";
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Account = () => {

  const adminInfo = JSON.parse(localStorage.getItem("adminProfile"));
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3)
  const getalltask = () => {
    httpFile
      .get(`/accountList`, {
        headers: {
          Authorization: `Bearer ${adminInfo?.token}`,
        },
      })
      .then((res) => {
        setData(res.data.body);
      })
      .catch((err) => {
        var error = err.response.data.message;
        if (error === "Please Login First") {
          localStorage.clear();
          navigate("/");
        }
        console.error(err.message);
      });
  };

  useEffect(() => {
    getalltask();
  }, [adminInfo?.token]);

  const searchHandler = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // Update the search term state
    httpFile
      .post(`/search`, {
        username: value,

      }, {
        headers: {
          Authorization: `Bearer ${adminInfo?.token}`,
        },
      })
      .then((res) => {
        setData(res.data.body);
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Something went wrong",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        console.error("Search error:", error);
      });
  };





  const deleteHandler = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        httpFile
          .delete(`/delete_user/${_id}`, {
            headers: {
              Authorization: `Bearer ${adminInfo?.token}`,
            },
          })
          .then(() => {
            getalltask();
            toast.success("User Deleted Successfully", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          })
          .catch((error) => {
            toast.error(
              error.response?.data?.message || "Something went wrong",
              {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
            console.error("Delete error:", error);
          });
      }
    });
  };

  // Calculate the index of the first and last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };



  return (
    <section className="section">
      <div className="section-header">
        <h1>User List</h1>
      </div>

      <div className="text-right">
        <Link
          to={`/addcount`}
          className="btn btn-icon icon-left btn-primary shadow"
        >
          <i className=" "></i>ADD NEW
        </Link>
      </div>

      <div className="section-body">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Name"
                value={searchTerm}
                onChange={searchHandler}
              />
            </div>

          </div>

          <div className="table-responsive">
            <table id="myTable" className="table">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">UserName</th>
                  <th scope="col">AppName</th>

                  <th scope="col">State</th>
                   
                   <th scope="col">Status</th>

                   <th scope="col">CreatedAt</th>

                  <th scope="col md">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((userData, index) => (
                  <tr key={userData._id}>
                    <td>{index + 1}</td>
                    <td>{userData.username}</td>


                    <td>{userData.appname}</td>
                    <td>{userData.state === 1 ? 'Enabled' : 'Disabled'}</td>

                    <td>{userData.status === 1 ? 'Online' : 'Offline'}</td>

                    <td>{(new Date(userData.createdAt)).toLocaleDateString()}</td>

                    <td>
                      <>
                

                        <Link
                          to={`/accountview/${userData._id}`}
                          className="btn px-2 py-1 btn_hover btn-outline-success"
                        >
                          <i className="fas fa-eye"></i>
                        </Link>
                         
                         <Link to={`/accountupdate/${userData._id}`}
                         className="btn px-2 py-1 btn_hover btn-outline-success">
                          <i className="fas fa-edit"></i>
                         </Link>
                        <button
                          onClick={() => deleteHandler(userData._id)}
                          className="btn px-2 py-1 btn-outline-danger"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {Array.from({ length: totalPages }).map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Account;
