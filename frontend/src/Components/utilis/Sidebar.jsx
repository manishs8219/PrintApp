import React, { useEffect, useState } from "react";
import { Link,useLocation,useNavigate} from "react-router-dom";
import { httpFile } from "../../../config/axiosConfig";
function Sidebar() {

const adminInfo = JSON.parse(localStorage.getItem("adminProfile"));

const [data, setData] = useState([]);
const [cmsDropdown, setCmsDropdown] = useState(false);
const [ContactDropdown, setContactDropdown] = useState(false);
const location = useLocation();
const path = location.pathname;
const getuser = () => {
  httpFile
    .get(`/getprofile`, {
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
       
        toast.error("Please Login First");
      }
      console.error(err.message);
    });
};

useEffect(() => {
  getuser();
}, []);

const sidebarHideShow = () => {
  if (document.body.classList.contains("sidebar-show")) {
    document.body.classList.add("sidebar-gone");
    document.body.classList.remove("sidebar-mini");
    document.body.classList.remove("sidebar-show");
  }
};

useEffect(() => {
  sidebarHideShow();
}, []);

  return (
    <div>
      <div className="main-sidebar sidebar-style-2 shadow">
        <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
  <Link to="/dashboard">
    {/* <img
      src="/assets/Group-BPf0JKO5.png"
      alt="logo"
      className="mx-auto d-block"
      style={{marginRight:'10px', width: "80px",}}
    /> */}
  </Link>
</div>
<div className="sidebar-brand sidebar-brand-sm">
  <Link to="/dashboard">

    <h4>Tap To Order</h4>
    {/* <img
      src="/assets/Group-BPf0JKO5.png"
      alt="logo"
      className="mx-auto d-block"
      style={{ width: "60px",}}
    /> */}
  </Link>
</div>

          <ul className="sidebar-menu">
            <li className="menu-header"></li>
            <li
             className={`nav-item ${path === "/dashboard" ? "active" : ""}`}
             onClick={() => {}}
           >
              <Link to={"/dashboard"} className="nav-link ">
                <i className="fas fa-fire"></i>
                <span>DASHBOARD</span>
              </Link>
            </li>
          
        
  
         
    <li
      className={`nav-item ${path === "/account" ? "active" : ""}`}
      onClick={() => {}}
    >
      <Link to="/account" className="nav-link">
        <i className="fas fa-users"></i>
        <span>ACCOUNT</span>
      </Link>
    </li>



    <li
              onClick={(e) => setCmsDropdown(!cmsDropdown)}
              className={`nav-item dropdown ${cmsDropdown ? "active" : ""}`}
            >
              <a href="#" className="nav-link has-dropdown">
                <i className="fa-solid fa-file-lines"></i> <span>CMS</span>
              </a>
              <ul
                className="dropdown-menu"
                style={{ display: cmsDropdown ? "block" : "none" }}
              >
                <li
                  className={`${path === "/termsandcondition" ? "active" : ""}`}
                >
                  <Link
                    to={"/termsandcondition"}
                    className="nav-link"
                    onClick={sidebarHideShow}
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li className={`${path === "/privacypolicy" ? "active" : ""}`}>
                  <Link
                    className="nav-link"
                    to={"/privacypolicy"}
                    onClick={sidebarHideShow}
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </li>

  
             </ul>

             
        </aside>
      </div>
    </div>
  );
}

export default Sidebar;