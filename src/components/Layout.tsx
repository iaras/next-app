import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
}

//const Layout: React.FC<LayoutProps> = ({ children, isLoggedIn }) => {
//  return (
//    <div className="flex flex-col h-screen">
//      <Header isLoggedIn={isLoggedIn}/>
//      <div className="flex flex-1 overflow-hidden">
//        <Sidebar />
//        <main className="flex-1 overflow-y-auto p-4">
//          {children}
//        </main>
//      </div>
//      <footer className="bg-gray-800 text-white py-4">
//        <div className="container mx-auto px-4 text-center">
//          © 2024 My App. All rights reserved.
//        </div>
//      </footer>
//    </div>
//  );
//};
const Layout: React.FC<LayoutProps> = ({ children, isLoggedIn }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header initialIsLoggedIn={isLoggedIn} />
      <div className="flex flex-1">
        {isLoggedIn && <Sidebar />}
        <main className={`flex-1 ${isLoggedIn ? 'p-6' : ''}`}>
          {children}
        </main>
      </div>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          © 2024 My App. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;

