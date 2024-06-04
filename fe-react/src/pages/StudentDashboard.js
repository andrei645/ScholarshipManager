import axiosInstance from '../services/AxiosInstance';
import React, { useEffect, useState } from 'react';
import avatar from '../assets/images/4e22beef6d94640c45a1b15f4a158b23-removebg-preview.png';
import { Button } from '../components/Button/Button';

export const StudentDashboard = ({ userDetails }) => {
    const { email, role, firstName, lastName } = userDetails;

    const [userGrades, setUserGrades] = useState([]);
    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const response = await axiosInstance.get('api/users/grades');
                setUserGrades(response.data);
            } catch (error) {
                console.error('Error fetching grades:', error);
            }
        };
        fetchGrades();
    }, []);

    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const responseForCourses = await axiosInstance.get('api/courses');
                setCourses(responseForCourses.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    const getGradeForCourse = (courseId) => {
        const grade = userGrades.find(grade => grade.courseId === courseId);
        return grade ? grade.value : '-';
    };

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
                        <img src={avatar} style={{ maxWidth: '70%', maxHeight: '70%' }} />
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
                <div className="col-md-10 bg-light d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <div style={{ width: '90%' }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Course</th>
                                    {courses.map((course, index) => (
                                        <th key={index} scope="col">{course.name}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><b>Grade</b></td>
                                    {courses.map((course, index) => (
                                        <td key={index}><b>{getGradeForCourse(course.id)}</b></td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
