import React, {useState,useEffect} from 'react'
import axios from 'axios'
import '../CSS/AllUsers.css'
//import GET_USERS from '../utils/API_OPERATIONS'
const AllUsers = () => {
    const [users,SetUsers] = useState(null)
    const [refresh,SetRefresh] = useState(false)

    const mapUsers = (users) => users.map(user =>(
            <tr>
            
            <td>{user.u_id}</td>
            <td>{user.email}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.hash_password}</td>
            <td>{user.perm_type}</td>
            <td>{user.time_registered}</td>
            </tr>
    ));
    
    
    useEffect(() => {
        //const res_data = GET_USERS()
        axios({
            url:'/test',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).then(res => {
            SetUsers(res.data.data)
            console.log('users:',res.data.data)
            SetRefresh(true)
        })
        //const res_data = GET_USERS()
        

    },[])
    
    return (
        <div className="main-users">
            <table className="t01">
                <tr>
                <th>u_id</th>
                <th>email</th>
                <th>name_first</th> 
                <th>name_last</th>
                <th>encrypted_pass</th>
                <th>perm_type</th>
                <th>time_registered</th>
                </tr>
                {refresh &&  mapUsers(users)}
            </table>
        </div>
    )
}

export default AllUsers
