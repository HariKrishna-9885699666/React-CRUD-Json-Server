import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
        <div className="w-ful h-16 flex items-center px-14 justify-between bg-blue-600">
            <Link to={"/"} className="text-3xl font-semibold font-Montesarrat text-white">React CRUD Operations With JSON Server</Link>
            <Link to={"/add-user"} className="rounded-lg bg-white font-bold text-black py-2 px-2">Add Users</Link>
        </div>
    </>
  )
}

export default Navbar;