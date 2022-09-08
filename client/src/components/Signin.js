import React, { useState } from "react";

function Signin(){

    const [user, setUser] = useState({
        name:"", email:"", password:"", cpassword:""
    });


    let name, value;
    const handleInput = (e) => {
        name  = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value});

    }

    const PostData = async (e) => {
        e.preventDefault();

        const {name, email, password, cpassword} = user;

        const res = await fetch('/signin', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                name, email, password, cpassword, created_at: '2022-08-28 21:03:23'
            })
        });

        const data = await res.json();

        if(res.status === 422 || !data){
            window.alert(data.error);
        } else {
            window.alert("Registration successfully");
        }
    }
    return (<>
     <form methos="POST">
        <input type="name" name="name" placeholder='Enter your Full Name' value={user.name} onChange={handleInput}/>
        <input type="email" name="email" placeholder='Enter your email' value={user.email} onChange={handleInput}/>
        <input type="password" name="password" placeholder='Enter your password' value={user.password} onChange={handleInput}/>
        <input type="password" name="cpassword" placeholder='Re-enter your password' value={user.cpassword} onChange={handleInput}/>
        <button onClick={PostData}>Register</button>
    </form>
    </>)
}

export default Signin;