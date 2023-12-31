"use client"

import React from 'react';
import HtmlReactParser from 'html-react-parser';

export default function Home() {
  const [allPosts, setAllPosts] = React.useState([]);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    setIsLoggedIn(localStorage.getItem('access_token') !== null);
    setIsAdmin(localStorage.getItem('is_admin') === 'true');
    const allPostList = fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: 'GET'
    }).then(response =>  {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }
      return response.json();
    }).then(data => {
      setAllPosts(data);
    }).catch(error => {
      console.error("Error:", error)
    })
  }, [isLoggedIn])

  function handleSignOut() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('is_admin')
    setIsLoggedIn(false);
  }

  return (
    <main className="min-h-screen items-center">
      <div className='flex justify-between items-center border-black border-b-2 dark:border-white'>
        <h1 className='text-center font-bold text-xl md:text-2xl p-4 md:p-12 pr-0'><a href="/">nagyb3&apos;s blog</a></h1>
        {isLoggedIn ? 
        <div>
          { isAdmin ? <button className='mr-6'><a href="/admin">Admin</a></button> : undefined }
          <button className='my-10 mx-3 md:mx-12' onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
        
      : 
        <div>
          <button className='h-min mx-3 md:mx-10 bg-white p-3 rounded text-black font-bold'><a href="/signup">Sign Up</a></button>
          <button className='my-10 mx-6 md:mx-12 font-bold'><a href="/login">Log In</a></button>
        </div>
      }
      </div>
      <p className='text-xl font-bold m-8'>ALL OF THE POSTS:</p>
      {allPosts.map(item => {
        return <div key={item._id} className='rounded-lg flex flex-col gap-10 border-2 dark:border-white border-black px-5 py-10 m-5 dark:bg-black bg-white'>
          <h2 className='font-bold text-2xl'><a href={"/post?postid=" + item._id}>{item.title}</a></h2>
          {HtmlReactParser(item.text)}
        </div>
      })}
    
    </main>
  )
}
