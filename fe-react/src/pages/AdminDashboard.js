import axiosInstance from "../services/AxiosInstance";
import React, { useState } from "react";
import avatar from "../assets/images/0d64989794b1a4c9d89bff571d3d5842-removebg-preview.png";
import { Button } from "../components/Button/Button";
import { Input } from "../components/Input/Input";
import { Route, Routes } from "react-router-dom";
import { Authentication } from "./Authentication";

export const AdminDashboard = ({ userDetails }) => {
  const { id, email, role, firstName, lastName, nrMat } = userDetails;

  const [showUpdateUserInput, setShowUpdateUserInput] = useState(false);
  const [showDeleteUserInput, setShowDeleteUserInput] = useState(false);
  const [showDeleteCoursesInput, setShowDeleteCoursesInput] = useState(false);
  const [showGetInfoInput, setShowGetInfoInput] = useState(false);

  const [updateUserInput, setUpdateUserInput] = useState("");
  const [deleteUserInput, setDeleteUserInput] = useState("");
  const [deleteCoursesInput, setDeleteCoursesInput] = useState("");
  const [getInfoInput, setGetInfoInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);


  const handleUpdateUserInputChange = (event) => {
    setUpdateUserInput(event.target.value);
  };

  const handleDeleteUserInputChange = (event) => {
    setDeleteUserInput(event.target.value);
  };

  const handleDeleteCoursesInputChange = (event) => {
    setDeleteCoursesInput(event.target.value);
  };

  const handleGetInfoInputChange = (event) => {
    setGetInfoInput(event.target.value);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("auth_code");
    window.location.href = "/";
  };

  const handleDeleteUser = () => {
    const jwtToken = sessionStorage.getItem("auth_code");
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    // Assuming the email is stored in the deleteUserInput state
    const emailToDelete = deleteUserInput;

    axiosInstance
      .delete("api/users", { ...config, data: { email: emailToDelete } })
      .then((response) => {
        alert("User deleted successfully");
      })
      .catch((error) => {
        alert("Error deleting user");
      });
  };

  const handleDeleteCourse = () => {
    const jwtToken = sessionStorage.getItem("auth_code");
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const courseIdToDelete = deleteCoursesInput;

    axiosInstance
      .delete(`api/courses/${courseIdToDelete}`, config)
      .then((response) => {
        alert("Course deleted successfully");
      })
      .catch((error) => {
        alert("Error deleting course");
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Left sidebar */}
        <div className="col-md-2" style={{ paddingLeft: "0" }}>
          <div
            className="student-avatar-container mb-4"
            style={{
              height: "37vh",
              backgroundColor: "#f2bb00",
              color: "#00293f",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={avatar}
              style={{ maxWidth: "70%", maxHeight: "70%" }}
              alt="Avatar"
            />
          </div>
          <div
            className="student-details-container d-flex flex-column justify-content-center align-items-center"
            style={{
              height: "60vh",
              backgroundColor: "#00293f",
              color: "#f2bb00",
              textAlign: "left",
            }}
          >
            <p
              style={{ width: "100%", textAlign: "left", paddingLeft: "15px" }}
            >
              <b>Prenume : </b>
              {firstName}
            </p>
            <p
              style={{ width: "100%", textAlign: "left", paddingLeft: "15px" }}
            >
              <b>Nume Familie : </b>
              {lastName}
            </p>
            <p
              style={{ width: "100%", textAlign: "left", paddingLeft: "15px" }}
            >
              <b>Email:</b> {email}
            </p>
            <p
              style={{ width: "100%", textAlign: "left", paddingLeft: "15px" }}
            >
              <b>Rol : </b>
              {role}
            </p>
            <div style={{ width: "100%", float: "right", paddingLeft: "15px", paddingTop:"100px"}}>
            <Button
                  type="submit"
                  role="secondary"
                  onClick={handleLogout}
                >Log out
                </Button>
                </div>
          </div>
        </div>
        <div className="col-md-10 bg-light">
          <div className="row">
            <div className="col" style={{ height: "30vh" }}>
              {/* Area with the buttons */}
              <div className="d-flex justify-content-around align-items-center" style={{ height: "100%" }}>
                <Button
                  type="submit"
                  role="primary"
                  onClick={() => setShowUpdateUserInput(true)}
                >
                  Update User
                </Button>
                <Button
                  type="submit"
                  role="secondary"
                  onClick={() => setShowDeleteUserInput(true)}
                >
                  Delete User
                </Button>
                <Button
                  type="submit"
                  role="primary"
                  onClick={() => setShowDeleteCoursesInput(true)}
                >
                  Delete Courses
                </Button>
                <Button
                  type="submit"
                  role="secondary"
                >
                  Get info
                </Button>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              {showUpdateUserInput && (
                <>
                  <Input
                    type="text"
                    name="updateUserInput"
                    value={updateUserInput}
                    placeholder="Enter updated user ID"
                    onChange={handleUpdateUserInputChange}
                  />
                  <Input
                    type="text"
                    name="updateUserInput"
                    value={updateUserInput}
                    placeholder="Enter updated user registration number"
                    onChange={handleUpdateUserInputChange}
                  />
                  <Input
                    type="text"
                    name="updateUserInput"
                    value={updateUserInput}
                    placeholder="Enter updated user last name"
                    onChange={handleUpdateUserInputChange}
                  />
                  <Input
                    type="text"
                    name="updateUserInput"
                    value={updateUserInput}
                    placeholder="Enter updated user first name"
                    onChange={handleUpdateUserInputChange}
                  />
                  <Input
                    type="text"
                    name="updateUserInput"
                    value={updateUserInput}
                    placeholder="Enter updated user email"
                    onChange={handleUpdateUserInputChange}
                  />
                  <Input
                    type="text"
                    name="updateUserInput"
                    value={updateUserInput}
                    placeholder="Enter updated user password"
                    onChange={handleUpdateUserInputChange}
                  />
                  <Input
                    type="text"
                    name="updateUserInput"
                    value={updateUserInput}
                    placeholder="Enter updated user password"
                    onChange={handleUpdateUserInputChange}
                  />
                  {updateUserInput && (
                    <button className="submit-button">Submit</button>
                  )}
                  <button className="close-button" onClick={() => setShowUpdateUserInput(false)}>x</button>
                </>
              )}
              {showDeleteUserInput && (
                <>
                  <Input
                    type="text"
                    name="deleteUserInput"
                    value={deleteUserInput}
                    placeholder="Enter user email to delete"
                    onChange={handleDeleteUserInputChange}
                  />
                  {deleteUserInput && (
                    <button className="submit-button" onClick={handleDeleteUser}>Submit</button>
                  )}
                  <button className="close-button" onClick={() => setShowDeleteUserInput(false)}>x</button>
                </>
              )}
              {showDeleteCoursesInput && (
                <>
                  <Input
                    type="text"
                    name="deleteCoursesInput"
                    value={deleteCoursesInput}
                    placeholder="Enter course name to delete"
                    onChange={handleDeleteCoursesInputChange}
                  />
                  {deleteCoursesInput && (
                    <button className="submit-button" onClick={handleDeleteCourse}>Submit</button>
                  )}
                  <button className="close-button" onClick={() => setShowDeleteCoursesInput(false)}>x</button>
                </>
              )}
              {showGetInfoInput && (
                <>
                  <Input
                    type="text"
                    name="getInfoInput"
                    value={getInfoInput}
                    placeholder="Enter user info to get"
                    onChange={handleGetInfoInputChange}
                  />
                  {getInfoInput && (
                    <button className="submit-button">Submit</button>
                  )}
                  <button className="close-button" onClick={() => setShowGetInfoInput(false)}>x</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

