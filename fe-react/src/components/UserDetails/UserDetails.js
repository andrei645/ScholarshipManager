import { useState } from "react"
import { Input } from "../Input/Input"
import { Button } from "../Button/Button";
import { getUsers, updateUser } from "../../services/users";

export const UserDetails = ({ user, setUsers, setIsOpenModal }) => {
    const [userDetails, setUserDetails] = useState({
        id: user.id,
        email: user.email,
        numeFam: user.numeFam,
        role: user.role,
        prenume: user.prenume,
        nrMat: user.nrMat,
        parola: user.parola
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    }

    const submit = async (e) => {
        e.preventDefault();
        const response = await updateUser(userDetails);
        if(response.status === 200){
            const users = await getUsers();
            setUsers(users);
            setIsOpenModal(false);

        }
    }

    return (
        <form onSubmit={submit} style={{ padding: '16px;' }}>
            <h4>Update user</h4>
            <div style={{ display: 'flex', gap: '15px' }}>
                <Input
                    type="text"
                    label={"Firstname"}
                    name="prenume"
                    value={userDetails.prenume}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    label={"Lastname"}
                    name="numeFam"
                    value={userDetails.numeFam}
                    onChange={handleChange}
                />
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
                <Input
                    type="text"
                    label={"Email"}
                    name="email"
                    value={userDetails.email}
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    label={"Registration number"}
                    name="nrMat"
                    value={userDetails.nrMat}
                    onChange={handleChange}
                />

            </div>
            <div class="form-group" style={{display: 'flex', flexDirection: 'column'}}>
                <label>Role</label>
                <select onChange={handleChange} name="role">
                    <option value="student">Student</option>
                    <option value="profesor">Professor</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <div style={{ display: 'flex', gap: '15px', margin: '20px 0px', justifyContent: 'space-between' }}>
                <Button type="button" role="secondary" onClick={() => setIsOpenModal(false)}>Cancel</Button>
                <Button type="submit" role="primary">Save</Button>
            </div>
        </form>
    )
}