import { useMySchoolarContext } from "../context/SchoolarContext"
import {StudentDashboard} from "../pages/StudentDashboard";
import { AdminDashboard } from "./AdminDashboard";
import { TeacherDashboard } from "./TeacherDashboard";

const DashboardMapping = {
    'student': StudentDashboard,
    'profesor': TeacherDashboard,
    'admin': AdminDashboard

}

export const Dashboard = () => {
    const {state} = useMySchoolarContext();
    const role = state.userDetails.role;

    const Component = DashboardMapping[role];

    if(!Component){
        return <div>Not found</div>
    }
    return(
        <Component userDetails={state.userDetails}/>
    )
}