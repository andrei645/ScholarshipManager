import { getCourses } from '../../services/courses';
import './TableCourses.scss';
import axiosInstance from '../../services/AxiosInstance';
import '../TableCourses/TableCourses.scss';
import Modal from "react-modal";

import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from 'react';
import { CourseDetails } from '../CourseDetails/CourseDetails';
import { Button } from '../Button/Button';

export const TableCourses = ({ data, setCourses }) => {

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
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleAdd = () => {
        setIsOpenModal(true)
    }

    Modal.setAppElement('#root');

    const deleteCourse = async (id) => {

        const response = await axiosInstance.delete(`api/courses/${id}`);
        if (response.status === 200) {
            const courses = await getCourses();
            setCourses(courses);
        }
    }

    return (
        <>
            <Button type="primary" onClick={() => handleAdd()}>Add course</Button>
            <table id="table-admin">
                <tr>
                    <th>Course ID</th>
                    <th>Course name</th>
                    <th>Actions</th>
                </tr>
                {
                    data ? data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                    <div style={{ display: 'flex' }}>
                                        <button type="button" style={{ color: '#00293f', border: 'none' }} onClick={() => deleteCourse(item.id)}><FaTrash /></button>
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
                            contentLabel="Edit course"
                        >
                            <CourseDetails setCourses={setCourses} setIsOpenModal={setIsOpenModal} />
                        </Modal>
                        : ""
                }

            </table>
        </>

    )
}