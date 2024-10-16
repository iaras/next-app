"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  initialIsLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ initialIsLoggedIn }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (initialIsLoggedIn) {
      fetchUser();
    }
  }, [initialIsLoggedIn]);

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/user');
      if (response.ok) {
        const data = await response.json();
        setUsername(data.user.username);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setUsername(null);
        setIsLoggedIn(false);
        router.push('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white hover:text-gray-200 transition duration-300">
          My App
        </Link>
        <nav>
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Welcome, {username}!</span>
              <button
                onClick={handleLogout}
                className="bg-white text-indigo-600 hover:bg-indigo-100 py-2 px-4 rounded-full text-sm font-medium transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="text-sm font-medium hover:text-gray-200 transition duration-300">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
//"use client";
//
//import React, { useState, useEffect } from 'react';
//import Link from 'next/link';
//import { useRouter } from 'next/navigation';
//
//const Header: React.FC = () => {
//  const [username, setUsername] = useState<string | null>(null);
//  const router = useRouter();
//
//  useEffect(() => {
//    // ユーザー情報を取得
//    const fetchUser = async () => {
//      try {
//        const response = await fetch('/api/user');
//        if (response.ok) {
//          const data = await response.json();
//          setUsername(data.user.username);
//        }
//      } catch (error) {
//        console.error('Failed to fetch user:', error);
//      }
//    };
//
//    fetchUser();
//  }, []);
//
//  const handleLogout = async () => {
//    try {
//      const response = await fetch('/api/logout', {
//        method: 'POST',
//        headers: { 'Content-Type': 'application/json' },
//      });
//
//      if (response.ok) {
//        router.push('/login');
//      } else {
//        console.error('Logout failed');
//      }
//    } catch (error) {
//      console.error('Logout error:', error);
//    }
//  };
//
//  return (
//    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
//      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//        <Link href="/" className="text-2xl font-bold text-white hover:text-gray-200 transition duration-300">
//          My App
//        </Link>
//        <nav>
//          {username ? (
//            <div className="flex items-center space-x-4">
//              <span className="text-sm font-medium">Welcome, {username}!</span>
//              <button
//                onClick={handleLogout}
//                className="bg-white text-indigo-600 hover:bg-indigo-100 py-2 px-4 rounded-full text-sm font-medium transition duration-300"
//              >
//                Logout
//              </button>
//            </div>
//          ) : (
//            <Link href="/login" className="text-sm font-medium hover:text-gray-200 transition duration-300">
//              Login
//            </Link>
//          )}
//        </nav>
//      </div>
//    </header>
//  );
//};
//
//export default Header;