import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateUser = () => {
    const [user, setUser] = useState({})
    const {id} = useParams()
    useEffect(() => {
        const uri = `http://localhost:5000/users/${id}`
        fetch(uri)
        .then(res => res.json())
        .then(data => setUser(data))
    }, [])

    const handleName = e => {
        const updatedName = e.target.value
        const updatedUser = {name: updatedName, email: user.email}
        setUser(updatedUser)
        console.log(updatedName)
    }

    const handleEmail = e => {
        const updatedEmail = e.target.value
        const updatedUser = {...user}
        updatedUser.email = updatedEmail
        setUser(updatedUser)
    }

    const handleUserUpdate = e => {
        e.preventDefault()
        
    }

    return (
        <div>
            <h2>Update this user</h2>
            <h4>Name: {user.name}</h4>
            <h4>Email: {user.email}</h4>
            <form onSubmit={handleUserUpdate}>
                <input type="text" onChange={handleName} value={user.name || ''} /><br />
                <input type="email" onChange={handleEmail} value={user.email || ''} /><br />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateUser;