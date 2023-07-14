"use client"

import Image from 'next/image'
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
    <main className="min-h-screen items-center">
    
    
    </main>
  )
}
