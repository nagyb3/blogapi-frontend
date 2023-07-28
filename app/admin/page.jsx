"use client";

import React from "react";

export default function Page() {
  const [isAdmin, setIsAdmin] = React.useState(true);

  React.useEffect(() => {
    setIsAdmin(localStorage.getItem("is_admin") === 'true');
  }, []);

  return (
    <div>
      {isAdmin ? (
        <div className="flex flex-col items-center">
          <h1 className="text-center font-bold text-2xl p-12">
            <a href="/">nagyb3&apos;s blog</a>
          </h1>
          <h1 className="text-center font-bold text-2xl">Admin Dashboard</h1>
          <button className="text-center m-12 bg-white text-black px-3 py-2 rounded font-semibold text-lg">
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
