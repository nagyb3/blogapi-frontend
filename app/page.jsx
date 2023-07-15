"use client"

import React from 'react';

export default function Home() {
  const [allPosts, setAllPosts] = React.useState([]);

  React.useEffect(() => {
    const allPostList = fetch('http://localhost:5000/posts', {
      method: 'GET'
    }).then(response =>  {
      // console.log(response)
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }
      return response.json();
    }).then(data => {
      // console.log('data', data);
      setAllPosts(data);
    }).catch(error => {
      console.error("Erro:", error)
    })
  }, [])

  // console.log(allPosts)

  return (
    <main className="min-h-screen items-center m-5">
      <h1 className='text-center font-bold text-2xl m-10'>nagyb3's blog</h1>
      <p className='text-xl font-bold m-2'>ALL OF THE POSTS:</p>
      {allPosts.map(item => {
        return <div key={item._id} className='rounded-lg flex flex-col gap-10 border-2 dark:border-white border-black px-5 py-10 m-5'>
          <h2 className='font-bold text-2xl'>{item.title}</h2>
          <p>{item.text}</p>
        </div>
      })}
    
    </main>
  )
}
