import { useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { addCourse, getCourses } from "../../services/courses";

export const CourseDetails = ({setCourses, setIsOpenModal}) => {

    const [courseName, setCourseName] = useState();

    const submit = async (e) => {
        e.preventDefault();
        const response = await addCourse(courseName);
        if(response.status === 201){
            const courses = await getCourses();
            setCourses(courses);
            setIsOpenModal(false)
        }
    }

    return(
        <form onSubmit={submit} style={{ padding: '16px;' }}>
            <h4>Add course</h4>
            <div>
                <Input
                    type="text"
                    label={"Course name"}
                    name="prenume"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    required={true}
                />
            </div>
            
            <div style={{ display: 'flex', gap: '15px', margin: '20px 0px', justifyContent: 'space-between' }}>
                <Button type="button" role="secondary" onClick={() => setIsOpenModal(false)}>Cancel</Button>
                <Button type="submit" role="primary">Add</Button>
            </div>
        </form>
    )
}