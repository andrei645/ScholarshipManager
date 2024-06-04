import axiosInstance from '../services/AxiosInstance';
import React, { useEffect, useState } from 'react';
import avatar from '../assets/images/8b167af653c2399dd93b952a48740620-removebg-preview.png';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input'; // Assuming Input component is located here

export const TeacherDashboard = ({ userDetails }) => {

    const { id, email, role, firstName, lastName } = userDetails;

    const [userSubjects, setUserSubjects] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [rows, setRows] = useState([]);
    const [inputData, setInputData] = useState({ studentId: '', courseId: '', value: '' });
    const [successMessage, setSuccessMessage] = useState('');

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    };

    const handleSave = async () => {
        try {
            const response = await axiosInstance.post('http://localhost:8080/api/grades', inputData);
            if (response.status === 200) {
                const newRow = { ...inputData, highlight: true };
                setRows([...rows, newRow]);
                setInputData({ studentId: '', courseId: '', value: '' });

                // Display success message
                setSuccessMessage('Grade added successfully');

                // Remove success message after 2 seconds
                setTimeout(() => {
                    setSuccessMessage('');
                }, 2000);

                // Remove highlight after 2 seconds
                setTimeout(() => {
                    setRows(rows => rows.map(row => row === newRow ? { ...row, highlight: false } : row));
                }, 2000);
            }
        } catch (error) {
            console.error('Error saving grade:', error);
        }
    };

    const handleDelete = (index) => {
        const newRows = rows.filter((_, i) => i !== index);
        setRows(newRows);
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
                <div className='col-md-10 bg-light d-flex flex-column justify-content-center align-items-center'>
                    <div className="w-100 d-flex justify-content-evenly align-items-center fixed-top p-3">
                        <h2>Subject: {userSubjects[0]?.name || "No subject assigned"}</h2>
                        <Button onClick={() => setShowTable(!showTable)}>Toggle Table</Button>
                    </div>
                    <div className="w-100" style={{ marginTop: '80px' }}>
                        {showTable && (
                            <div className="mt-4 w-100">
                                {successMessage && (
                                    <div className="alert alert-success" role="alert">
                                        {successMessage}
                                    </div>
                                )}
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Student ID</th>
                                            <th>Course ID</th>
                                            <th>Value</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows.map((row, index) => (
                                            <tr key={index} style={{ height: '50px', backgroundColor: row.highlight ? 'lightgreen' : 'white' }}>
                                                <td>{row.studentId}</td>
                                                <td>{row.courseId}</td>
                                                <td>{row.value}</td>
                                                <td><Button onClick={() => handleDelete(index)}>Delete</Button></td>
                                            </tr>
                                        ))}
                                        <tr style={{ height: '50px' }}>
                                            <td><Input type="text" name="studentId" value={inputData.studentId} onChange={handleInputChange} placeholder="Student ID" /></td>
                                            <td><Input type="text" name="courseId" value={inputData.courseId} onChange={handleInputChange} placeholder="Course ID" /></td>
                                            <td><Input type="text" name="value" value={inputData.value} onChange={handleInputChange} placeholder="Value" /></td>
                                            <td><Button onClick={handleSave}>Save</Button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
