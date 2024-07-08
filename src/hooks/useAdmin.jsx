import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function useAdmin() {
    const navigate = useNavigate()
    const addUser = ({ course, username, role, subSolders, userId, commandId, adminUser }) => {
        try {
            console.log(adminUser);
            axios.post(`http://localhost:5000/user/newUser`, {
                username, role, subSolders, userId, commandId, adminUser, course
            })
                .then(res => {
                    if (!res) {
                        console.log("user not add");
                        return
                    }
                    console.log("user added sucesfully");
                    navigate('/startReport')
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error);
        }

    }
    const addUserToComannd = ({ adminId, userId, usersToAdd }) => {
        try {
            axios.post(`http://localhost:5000/user/addUserToGroup`, {
                adminId, userId, usersToAdd
            })
                .then(res => {
                    if (!res) {
                        console.log("user not add to manager");
                        return
                    }
                    console.log("user added sucesfully");
                })
                .catch(err => console.log(err))
        } catch (error) {
            console.log(error);
        }
    }





    return { addUser, addUserToComannd }
}

export default useAdmin