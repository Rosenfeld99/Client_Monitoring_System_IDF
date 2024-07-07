import axios from 'axios'


function useAdmin() {

    const addUser = ({ username, role, subSolders, userId, commandId, AdminUser }) => {
        try {
            axios.post(`http://localhost:5000/user/newUser`, {
                username, role, subSolders, userId, commandId, AdminUser
            })
                .then(res => {
                    if (!res) {
                        console.log("user not add");
                        return
                    }
                    console.log("user added sucesfully");
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