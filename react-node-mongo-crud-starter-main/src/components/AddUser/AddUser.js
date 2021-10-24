import React, { useRef } from 'react';

const AddUser = () => {
    const nameRef = useRef()
    const emailRef = useRef()

    const handleAddUser = e => {
        e.preventDefault()
        const name = nameRef.current.value
        const email = emailRef.current.value

        const newUser = {name, email}

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId) {
                alert("A user is added in the Database")
            }
        })

        e.target.reset()
    }

    return (
        <div>
            <h2>This is Add User</h2>
            <form onSubmit={handleAddUser}>
                <input type="text" name="" id="" ref={nameRef} /><br />
                <input type="Email" name="" id="" ref={emailRef} /><br />
                <input type="submit" value="Add" />
            </form>
        </div>
    );
};

export default AddUser;