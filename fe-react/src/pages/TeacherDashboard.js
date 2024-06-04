import axiosInstance from '../services/AxiosInstance';
import React, { useEffect, useState } from 'react';
import avatar from '../assets/images/8b167af653c2399dd93b952a48740620-removebg-preview.png';
import { Button } from '../components/Button/Button';

export const TeacherDashboard = ({ userDetails }) => {

    const { id, email, role, firstName, lastName } = userDetails;

    const [userSubjects, setUserSubjects] = useState([]);
    
    useEffect(() => {
        const fetchUserSubjects = async () => {
            try {
                const response = await axiosInstance.get('/api/users/courses/' + id);
                setUserSubjects(response.data);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };
        fetchUserSubjects();
    }, [id]);

    const handleLogout = () => {
        sessionStorage.removeItem("auth_code");
        window.location.href = "/";
      };

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Left sidebar */}
                <div className="col-md-2" style={{ paddingLeft: '0' }}>
                    <div className="student-avatar-container mb-4" style={{ height: '37vh', backgroundColor: '#f2bb00', color: '#00293f', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={avatar} style={{ maxWidth: '70%', maxHeight: '70%' }} alt="Avatar" />
                    </div>
                    <div className="student-details-container d-flex flex-column justify-content-center align-items-center" style={{ height: '60vh', backgroundColor: '#00293f', color: '#f2bb00', textAlign: 'left' }}>
                        <p style={{ width: '100%', textAlign: 'left', paddingLeft: '15px' }}><b>Prenume : </b>{firstName}</p>
                        <p style={{ width: '100%', textAlign: 'left', paddingLeft: '15px' }}><b>Nume Familie : </b>{lastName}</p>
                        <p style={{ width: '100%', textAlign: 'left', paddingLeft: '15px' }}><b>Email:</b> {email}</p>
                        <p style={{ width: '100%', textAlign: 'left', paddingLeft: '15px' }}><b>Rol : </b>{role}</p>
                        <div style={{ width: "100%", float: "right", paddingLeft: "15px", paddingTop:"100px"}}>
                            <Button
                                type="submit"
                                role="secondary"
                                onClick={handleLogout}
                                >Log out</Button>
                        </div>
                    </div>
                </div>
                {/* Main content */}
                <div className='col-md-10 bg-light d-flex justify-content-center align-items-center'>
                    {userSubjects.length > 0 ? (
                        <h2>Subject: {userSubjects[0].name}</h2>
                    ) : (
                        <h2>No subject assigned</h2>
                    )}
                </div>
            </div>
        </div>
    );
};
