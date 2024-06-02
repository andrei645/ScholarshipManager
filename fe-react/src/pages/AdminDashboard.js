import axiosInstance from "../services/AxiosInstance";
import React, { useEffect, useState } from "react";
import avatar from "../assets/images/0d64989794b1a4c9d89bff571d3d5842-removebg-preview.png";
import { Button } from "../components/Button/Button";

export const AdminDashboard = ({ userDetails }) => {
  const { id, email, role, firstName, lastName, nrMat } = userDetails;

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
                  onClick={() => console.log("Button 1 clicked")}
                >
                  Update User
                </Button>
                <Button
                  type="submit"
                  role="secondary"
                  onClick={() => console.log("Button 1 clicked")}
                >
                  Delete User
                </Button>
                <Button
                  type="submit"
                  role="primary"
                  onClick={() => console.log("Button 1 clicked")}
                >
                  Delete Courses
                </Button>
                <Button
                  type="submit"
                  role="secondary"
                  onClick={() => console.log("Button 1 clicked")}
                >
                  Get info
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
