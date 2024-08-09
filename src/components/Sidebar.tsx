import React from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-100 p-4">
      <nav>
        <ul>
          <li className="mb-2">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              Home
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/upload" className="text-blue-600 hover:text-blue-800">
              Upload Image
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;