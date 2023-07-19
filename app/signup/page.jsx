"use client"

import React from "react";

export default function SignUp() {
    
    const [signUpEmail, setSignUpEmail] = React.useState("");

    const [signUpPassword, setSignUpPassword] = React.useState("");
    
    
    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: signUpEmail, 
                password: signUpPassword
            })
        }).then(response => {
            // console.log(response.status);
            if (response.status === 200) {
                setSignUpEmail("");
                setSignUpPassword("");
            }
            return response.json()
        }).then(data => {
            localStorage.setItem('access_token', data.token);
            console.log(localStorage.getItem('access_token'));
        }).catch(error => {
            console.error(error);
        })
    }
    
    return (
        <div>
            <h1 className="text-center font-bold text-2xl m-10">SIGNUP to nagyb3's blog</h1>
            <form onSubmit={e => handleSubmit(e)} className="flex flex-col items-center">
                <div className="m-5 w-fit">
                    <label htmlFor="email">Email:</label>
                    <input className="m-2 p-1 rounded text-black" type="email" name="email" id="email" value={signUpEmail}
                    onChange={e => setSignUpEmail(e.target.value)} />    
                </div>
                <div className="m-5 w-fit">
                    <label htmlFor="password">Password:</label>
                    <input className="m-2 p-1 rounded text-black" type="password" name="password" id="password" value={signUpPassword}
                    onChange={e => setSignUpPassword(e.target.value)} />
                </div>
                <input className="bg-white text-black font-bold p-3 rounded m-10" type="submit" value="SIGNUP" />
            </form>
        </div>
    )
}