"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user');
        if (response.ok) {
          const data = await response.json();
          setUsername(data.user.username);
        } else {
          console.error('Failed to fetch user');
          router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        router.push('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  //return (
  //  <div className="flex flex-col items-center justify-center min-h-screen py-2">
  //    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
  //      <h1 className="text-6xl font-bold">
  //        Welcome to the Dashboard
  //      </h1>
  //      <p className="mt-3 text-2xl">
  //        Hello, {username}!
  //      </p>
  //      <button
  //        onClick={handleLogout}
  //        className="mt-6 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  //      >
  //        Logout
  //      </button>
  //    </main>
  //  </div>
  //);
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-4xl font-bold mb-6">
        Welcome to the Dashboard
      </h1>
      <p className="text-xl mb-8">
        Hello, {username}! This is your personal dashboard.
      </p>
    </div>
  );
}