import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

//const Layout: React.FC<LayoutProps> = ({ children }) => {
//  return (
//    <div className="flex flex-col min-h-screen">
//      <Header />
//      <main className="flex-grow bg-gray-100 bg-opacity-50 background-pattern">
//        <div className="container mx-auto px-4 py-8">
//          {children}
//        </div>
//      </main>
//      <footer className="bg-gray-800 text-white py-4">
//        <div className="container mx-auto px-4 text-center">
//          © 2024 My App. All rights reserved.
//        </div>
//      </footer>
//    </div>
//  );
//};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          © 2024 My App. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;

