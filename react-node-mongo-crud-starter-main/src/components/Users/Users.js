import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/users')
        .then(res => res.json())
        .then(data => setUsers(data))        
    }, [])

    const handleRemove = id => {
        const isAgree = window.confirm("Are you sure you wnat to remove this user?")
        if(isAgree){
            const uri = `http://localhost:5000/users/${id}`
            fetch(uri, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                
                    if(data.deletedCount > 0){
                        const filteredUsers = users.filter(user => user._id !== id)
                        setUsers(filteredUsers)
                    }
                
            })
        }
    }


    console.log(users)
    return (
        <div>
            <h2>Total users {users.length}</h2>
            <div>
                {
                    users.map(user => <p key={user._id}>{user.name} :: {user.email} 
                        <Link to={`/users/update/${user._id}`}><button>Update</button></Link>
                        <button onClick={() => handleRemove(user._id)}>Remove</button>
                    </p>)
                }
            </div>
        </div>
    );
};

export default Users;