"use client";

import React from "react";

export default function Page() {
  const [isAdmin, setIsAdmin] = React.useState(true);

  React.useEffect(() => {
    setIsAdmin(localStorage.getItem("is_admin") === 'true');
  }, []);

  return (
    <div className="min-h-screen">
      {isAdmin ? (
        <div className="flex flex-col items-center">
          <h1 className="text-center font-bold text-2xl p-12">
            <a href="/">nagyb3&apos;s blog</a>
          </h1>
          <h1 className="text-center font-bold text-2xl">Admin Dashboard</h1>
          <button className="text-white m-12 p-4 bg-cyan-800 w-fit rounded-2xl font-semibold text-xl">
            <a href="/create">Create post</a>
          </button>
        </div>
      ) : (
        <div>
          <h1>YOU ARE NOT ADMIN!</h1>
        </div>
      )}
    </div>
  );
}
