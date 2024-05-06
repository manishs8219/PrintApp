import React, { useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Swal from "sweetalert2";
import axios from "axios";
import { httpFile } from "../../config/axiosConfig";
import { toast } from "react-toastify";

function TermsAndCondition() {
  const Navigate = useNavigate();
  const adminInfo = JSON.parse(localStorage.getItem("adminProfile"));

  const ID = "66388737421ebdc8df601dbe";

  const [termsCondition, setTermsCondition] = useState();
  const [validation, setValidation] = useState();
  const [updateValidation, setUpdateValidation] = useState();

  const contentChange = (e, editor) => {
    setTermsCondition({
      ...termsCondition,
      content: editor.getData(),
    });
  };

  useEffect(() => {
    httpFile
      .get(`/termsAndConditionsGet`, {
        headers: {
          Authorization: `Bearer ${adminInfo?.token}`,
        },
      })
      .then((res) => {
        if (res.data.result.type == 1) {
          setTermsCondition(res.data.result);
        }
      })
      .catch((er) => {
        var error = er.response.data.message;
        if (error == "Please Login First") {
          localStorage.clear();
          Navigate("/");
          // toast.error("Please Login First");
        }
        console.log(er.message);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (termsCondition == undefined || termsCondition?.title == "") {
      setValidation("This field is required");
      return Error;
    }
    if (termsCondition == undefined || termsCondition?.content == "") {
      setUpdateValidation("This field is required");
      return Error;
    }

    if (termsCondition) {
      httpFile
        .put(`/termsAndConditionsUpdate`, termsCondition, {
          headers: {
            Authorization: `Bearer ${adminInfo?.token}`,
          },
        })
        .then((res) => {
          toast.success("Terms & Condition Updated Successfully");
        //   location.reload();
        })
        .catch((err) => {
          var error = err.response.data.message;
          if (error == "Please Login First") {
            localStorage.clear();
            Navigate("/");
          }
          toast.error("Terms & Condition Update Failed");
        });
    }
  };

  const handleChange = (e) => {
    if (e.target.name == "title" || e.target.name == "content") {
      setValidation("");
      setUpdateValidation("");
    }

    setTermsCondition({ ...termsCondition, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="section">
        <div
          className="section-header  rounded py-4 shadow"
         
        >
          {" "}
          <h1 id="animated_box">Terms And Conditions</h1>
        </div>

        <div className="section-body ">
          <form onSubmit={handleSubmit} onChange={handleChange}>
            <div className="row">
              <div className="col-12">
                <div className="card shadow">
                  {/* <div
                    className="card-header "
                    style={{ justifyContent: "space-between" }}
                  >
                    <h4>Terms And Conditions</h4>
                    <Link to="/termsViewPage">
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
                          className="col-form-label col- text-dark font-weight-bold  py-3"
                          style={{ float: "left" }}
                        >
                          Title
                        </label>
                        <input
                          id="title"
                          type="text"
                          className="form-control"
                          name="title"
                          value={termsCondition?.title}
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
                        data={termsCondition?.content}
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

export default TermsAndCondition;
