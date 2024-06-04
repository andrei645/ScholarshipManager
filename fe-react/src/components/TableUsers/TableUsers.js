import axiosInstance from '../../services/AxiosInstance';
import { getCourses } from '../../services/courses';
import { getUsers } from '../../services/users';
import '../TableCourses/TableCourses.scss';
import Modal from "react-modal";

import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from 'react';
import { UserDetails } from '../UserDetails/UserDetails';

export const TableUsers = ({ data, setUsers }) => {

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    const [currentUserSelected, setCurrentUserSelected] = useState({});
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleEdit = (userId) => {
        setCurrentUserSelected(data.find((item, index) => item.id === userId));
        setIsOpenModal(true)
    }

    Modal.setAppElement('#root');

    const deleteUser = async (userEmail) => {
        const response = await axiosInstance.delete('api/users', { data: JSON.stringify({ 'email': userEmail }) });
        if (response.status === 200) {
            const courses = await getUsers();
            setUsers(courses);
        }
    }

    return (
        <table id="table-admin">
            <tr>
                <th>User ID</th>
                <th>Reg Number</th>
                <th>User Email</th>
                <th>User Name</th>
                <th>Actions</th>
            </tr>
            {
                data ? data.map((item, index) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nrMat}</td>
                            <td>{item.email}</td>
                            <td>{item.numeFam + " " + item.prenume}</td>
                            <td>
                                <div style={{ display: 'flex' }}>
                                    <button type="button" style={{ color: '#00293f', border: 'none' }} onClick={() => deleteUser(item.email)}><FaTrash /></button>
                                    <button type="button" style={{ color: '#00293f', border: 'none' }} onClick={() => handleEdit(item.id)}><FaEdit /></button>
                                </div>
                            </td>
                        </tr>

                        
                    )
                    
                }) : ""
            }
             {
                isOpenModal ?
                    <Modal
                        isOpen={isOpenModal}
                        onRequestClose={() => setIsOpenModal(false)}
                        style={customStyles}
                        contentLabel="Edit user"
                    >
                        <UserDetails user={currentUserSelected} setUsers={setUsers} setIsOpenModal={setIsOpenModal}/>
                    </Modal>
                    : ""
            }
        </table>
    )
}