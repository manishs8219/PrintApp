import React, { useEffect, useState } from "react";
import { httpFile } from '../../../config/axiosConfig';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


function Navbar() {
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [logout, setLogout] = useState();
    const adminInfo = JSON.parse(localStorage.getItem('adminProfile'));

    const getProfile = async () => {
        try {
          const res = await httpFile.get(`/getprofile`, {
            headers: {
              Authorization: `Bearer ${adminInfo?.token}`,
            },
          });
          const userData = res.data.body;
          setData(userData);
          setInfoData(userData);
        } catch (err) {
          var error = err.response.userData.message;
          if (error === "Please Login First") {
            localStorage.clear();
            navigate("/");
          }
          // Handle other errors and toast notifications here
        }
      };
   
      useEffect(() => {
        getProfile();
      }, []);
  
const logoutHandler = async(_id) =>{
    Swal.fire({
        title:"Are You Sure Want To Logout",
        text:"You Won't be able to revert this!",
        icon:"warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout!",
    }).then((result) => {
        if (result.isConfirmed) {
          httpFile
            .put(`/userlogout`,logout, {
              headers: {
                Authorization: `Bearer ${adminInfo?.token}`,
              },
            })
            .then((res) => {
              setLogout(res.data);
              toast.success("Logout Successfully");
           
              localStorage.clear();
              navigate("/");
            })
            .catch((er) =>
              Swal.fire(er.message, "Something went Wrong", "error")
            );
          // Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    };

    return (
        <>
            <div className="navbar-bg"></div>
            <nav className="navbar navbar-expand-lg main-navbar">
                <form className="form-inline mr-auto">
                    <ul className="navbar-nav mr-3" style={{ marginBottom: "36px" }}>
                        <li style={{ cursor: "pointer" }}>
                            <Link
                                style={{ color: "white" }}
                                to="#"
                                data-toggle="sidebar"
                                className="nav-link nav-link-lg ps-0"
                              
                            >
                                <i className="fas fa-bars"></i>
                            </Link>
                        </li>
                    </ul>
                </form>
                <ul
                    className="navbar-nav navbar-right"
                    style={{ marginBottom: "36px" }}
                >
                    <li className="dropdown">
                    <Link
              href="#"
              data-toggle="dropdown"
              className="nav-link dropdown-toggle nav-link-lg nav-link-user"
            >
              <img
                alt="images"
                style={{  height: "30px", width: "36px" }}
                src={
                  data?.images
                    ? `${
                        data?.images
                      }`
                      : "/fallback-image-url.png"
                }
                className="rounded-circle mr-1"
              />
              {/* {adminProfile && (
                <div className="d-sm-none d-lg-inline-block">Hi, admin</div>
              )} */}
            </Link>
                        <div className="dropdown-menu dropdown-menu-right">
                            {/* <div className="dropdown-title">Logged in 5 min ago</div> */}
                            <Link to="/editadmindetail" className="dropdown-item has-icon">
                                <i className="far fa-user"></i> Profile
                            </Link>
                            <Link to="/ChangePassword" className="dropdown-item has-icon">
                <i className="fas fa-bolt"></i> Change Password
              </Link>
                            {/* <Link to="#" className="dropdown-item has-icon">
                <i className="fas fa-cog"></i> Settings
              </Link> */}
                            <div className="dropdown-divider"></div>
              <Link
                to=""
                onClick={logoutHandler}
                className="dropdown-item has-icon text-danger"
              >
                <i className="fas fa-sign-out-alt"></i> Logout
              </Link>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;