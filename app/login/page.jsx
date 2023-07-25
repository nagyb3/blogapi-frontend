"use client"

import React from "react"

export default function Login() {
    
    const [loginEmail, setLoginEmail] = React.useState("");
    
    const [loginPassword, setLoginPassword] = React.useState("");
    
    function handleSubmit(e) {
        e.preventDefault();
        console.log('asd');
        fetch('http://localhost:5000/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                username: loginEmail,
                password: loginPassword
            })
        }).then(response => {
            console.log(response)
            return response.json();
        }).then(data => {
            localStorage.setItem('access_token', data.token);
            window.location.href = '/';
        }).catch(error => {
            console.error(error);
        })
    }
    
    return (
        <div className="min-h-screen">
            <h1 className='text-center font-bold text-2xl p-12'><a href="/">nagyb3's blog</a></h1>
            <h1 className="text-center font-bold text-2xl m-10">LOGIN</h1>
            <form onSubmit={e => handleSubmit(e)} className="flex flex-col items-center">
                <div className="m-5">
                    <label htmlFor="username">Username:</label>
                    <input className="m-2 p-1 rounded text-black" type="text" name="username" id="username"
                    onChange={e => setLoginEmail(e.target.value)} />    
                </div>
                <div className="m-5">
                    <label htmlFor="password">Password:</label>
                    <input className="m-2 p-1 rounded text-black" type="password" name="password" id="password"
                    onChange={e => setLoginPassword(e.target.value)} />
                </div>
                <input className="cursor-pointer dark:bg-white bg-gray-800 dark:text-black text-white font-semibold px-4 py-3 rounded m-10 text-lg" type="submit" value="LOGIN" />
            </form>
            <div className="flex justify-center gap-4 items-center m-24">
                <p>Don't have an account yet?</p>
                <button className="dark:bg-white bg-gray-800 p-2 dark:text-black text-white font-semibold rounded">
                    <a href="/signup">Sign Up!</a>
                </button>
            </div>
        </div>
    )
}