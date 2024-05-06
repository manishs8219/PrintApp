import React, { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Swal from "sweetalert2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import { httpFile } from "../../config/axiosConfig";
import { toast } from "react-toastify";

function PrivacyPolicy() {
  const adminInfo = JSON.parse(localStorage.getItem("adminProfile"));
  const Navigate = useNavigate();
  const ID = "6638871b421ebdc8df601dbc";

  const [privacyPolicy, setPrivacyPolicy] = useState();
  const [validation, setValidation] = useState();
  const [updateValidation, setUpdateValidation] = useState();

  useEffect(() => {
    httpFile
      .get(`/privacyPolicyGet`, {
        headers: {
          Authorization: `Bearer ${adminInfo?.token}`,
        },
      })
      .then((res) => {
        if (res.data.result.type == 0) {
          setPrivacyPolicy(res.data.result);
        }
      })
      .catch((err) => {
        var error = err.response.data.message;
        if (error == "Please Login First") {
          localStorage.clear();
          Navigate("/");
          // toast.error("Please Login First");
        }
        console.log(err.message);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (privacyPolicy == undefined || privacyPolicy?.title == "") {
      setValidation("This field is required");
      return Error;
    }
    if (privacyPolicy == undefined || privacyPolicy?.content == "") {
      setUpdateValidation("This field is required");
      return Error;
    }
    if (privacyPolicy) {
      httpFile
        .put(`/privacyPolicyUpdate`, privacyPolicy, {
          headers: {
            Authorization: `Bearer ${adminInfo?.token}`,
          },
        })
        .then((res) => {
          toast.success("Privacy & Policy Updated Successfully");
        //   location.reload();
        })

        .catch((err) => {
          var error = err.response.data.message;
          if (error == "Please Login First") {
            localStorage.clear();
            Navigate("/");
          }
          toast.error("Privacy & Policy Update Failed");
        });
    }
  };

  const handleChange = (e) => {
    if (e.target.name == "title") {
      setValidation("");
    }
    if (e.target.name == "content") {
      setUpdateValidation("");
    }
    setPrivacyPolicy({ ...privacyPolicy, [e.target.name]: e.target.value });
  };

  const contentChange = (e, editor) => {
    setPrivacyPolicy({
      ...privacyPolicy,
      content: editor.getData(),
    });
  };

  return (
    <>
      <section className="section">
        <div
          className="section-header  rounded py-4 shadow"
   
        >
          <h1 id="animated_box">Privacy Policy</h1>
        </div>

        <div className="section-body ">
          <form onSubmit={handleSubmit} onChange={handleChange}>
            <div className="row">
              <div className="col-12">
                <div className="card shadow">
                  {/*  <div
                    className="card-header"
                    style={{ justifyContent: "space-between" }}
                  >
                    <h4>Privacy & Policy</h4>
                    <Link to="/privacyViewPage">
                    {" "}
                    <button id="back" className="btn btn-link">
                      Back
                    </button>
                  </Link>
                  </div> */}
                  <div className="card-body">
                    <div className="form-group row mb-4">
                      <div className="col-11 ">
                        <label
                          className="col-form-label col- text-dark font-weight-bold  py-3 "
                          style={{ float: "left" }}
                        >
                          Title
                        </label>
                        <input
                          id="title"
                          type="text"
                          className="form-control"
                          name="title"
                          value={privacyPolicy?.title}
                        />
                        <p className="m-0 error_text" style={{ color: "red" }}>
                          {validation}
                        </p>
                      </div>
                    </div>
                    <div className="App ">
                      <CKEditor
                        editor={ClassicEditor}
                        name="content"
                        data={privacyPolicy?.content}
                        onChange={contentChange}
                      />
                    </div>
                    <p className="m-0 error_text" style={{ color: "red" }}>
                      {updateValidation}
                    </p>
                    <div className="form-group row mb-4 py-4">
                      <div className="col-sm-12 col-md-7">
                        <button
                          id="updateContent"
                          className="btn btn-primary float-left"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default PrivacyPolicy;
