import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { httpFile } from "../../config/axiosConfig";
import { toast } from "react-toastify";

const AccountUpdate = () => {

    const adminInfo = JSON.parse(localStorage.getItem("adminProfile"));
    const navigate = useNavigate();
    const { _id } = useParams();
    const [stateEnabled, setStateEnabled] = useState(true);
    const [data, setData] = useState({
        username: "",
        appname: "",
        state: "",
        status: ""


    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await httpFile.get(`/accountdataget/${_id}`, {
                    headers: {
                        Authorization: `Bearer ${adminInfo?.token}`,
                    },
                });

                const existingData = response.data.body;
                setData(existingData);
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };

        fetchData();
    }, [_id]);


    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setData((prevData) => ({
            ...prevData,
            [name]: name === "images" ? files[0] : value,
        }));
    };
    const toggleState = () => {
        const newState = stateEnabled ? "0" : "1"; // Toggle between '1' and '0'
        setStateEnabled(!stateEnabled);
        setData({ ...data, state: newState }); // Update state value in data object
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("appname", data.appname)
        formData.append("state", data.state);
        formData.append("status", data.status)


        try {
            const response = await httpFile.put(`/update/${_id}`, formData, {
                headers: {
                    Authorization: `Bearer ${adminInfo?.token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            const updatedData = response.data.body;
            setData(updatedData);
            toast.success("User Detail  Updated");
            navigate("/account");
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data?.message || "An error occurred.";
            toast.error(errorMessage);
        }
    };

    return (
        <section className="section">
            <div className="section-body p-3" style={{ borderRadius: "10px" }}>
                <div className="row mt-sm-4">
                    <div className="col-12 col-md-12 col-lg-12 mx-auto text-left">
                        <div className="card p-md-3 shadow">
                            <form onSubmit={handleSubmit}>
                                <div className="section-header rounded py-4 shadow">
                                    <h3 style={{ color: "black" }}>Edit Details</h3>
                                </div>
                                <div className="text-right">
                                    <Link
                                        to={`/account`}
                                        className="btn btn-icon icon-left btn-primary shadow"
                                    >
                                        <i className=" "></i>Back
                                    </Link>
                                </div>
                                <div className="card-body p-0">
                                    <div className="row">
                                        <div className="form-group col-md-12 col-12">
                                            <label style={{ color: "black" }}>UserName</label>
                                            <input
                                                type="text"
                                                maxLength={30}
                                                className="form-control"
                                                value={data.username}
                                                name="username"
                                                onChange={handleChange}
                                            />
                                            <div className="m-0 error_text" style={{ color: "red" }}></div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-md-12 col-12">
                                            <label style={{ color: "black" }}>AppName</label>
                                            <input
                                                type="text"
                                                maxLength={30}
                                                className="form-control"
                                                value={data.appname}
                                                name="appname"

                                                onChange={handleChange}
                                            />
                                            <div className="m-0 error_text" style={{ color: "red" }}></div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-6 col-12">
                                            <label style={{ color: "black" }}>State</label>
                                            <input
                                                type="text"
                                                maxLength={30}
                                                className="form-control"
                                                value={data.state === 1 ? "Enabled" : "Disabled"}
                                                name="state"
                                                onChange={handleChange}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-lg btn-icon icon-right"
                                                onClick={toggleState}
                                            >
                                                Toggle State
                                            </button>
                                            <div className="m-0 error_text" style={{ color: "red" }}></div>
                                        </div>
                                    </div>



                                    <div className="form-group text-center">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg btn-icon icon-right"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AccountUpdate;
