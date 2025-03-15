import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/Logo.png';
import utensils from '../../assets/images/utensils.svg';
import utensilsWhite from '../../assets/images/utensilswhite.svg'

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed top-4 left-4 z-50 text-black text-2xl cursor-pointer lg:hidden">
        <i className="fa-solid fa-bars-staggered" onClick={() => setIsOpen(true)}></i>
      </div>

      <div
        className={`fixed top-0 left-0 bottom-0 w-[250px] bg-[#f9fafb] z-50 transition-transform duration-200 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block`} 
      >
        <img src={logo} className="w-full h-auto object-cover" alt="logo" />
        <ul className="text-center">
          <li>
            <NavLink 
              to={''} 
              className={({ isActive }) => 
                `flex ps-6 m-4 border-[1px] border-gray-300 p-2 rounded-xl 
                ${isActive ? 'bg-[#f29724] text-white shadow-lg shadow-orange-300 border-orange-300 ' : ''} 
                transition-transform duration-200 hover:scale-105 hover:shadow-lg shadow-orange-100`}
            >
              <img src={utensils} className="w-[30px] pe-3" alt="" /> 
              <span className="text-xl">Meals</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to={'ingredients'} 
              className={({ isActive }) => 
                `flex ps-6 m-4 border-[1px] border-gray-300 p-2 rounded-xl 
                ${isActive ? 'bg-[#f29724] text-white shadow-lg shadow-orange-300 border-orange-300 ' : ''} 
                transition-transform duration-200 hover:scale-105 hover:shadow-lg shadow-orange-100`}
            >
              <img src={utensils} className="w-[30px] pe-3" alt="" /> 
              <span className="text-xl">Ingredients</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to={'area'} 
              className={({ isActive }) => 
                `flex ps-6 m-4 border-[1px] border-gray-300 p-2 rounded-xl 
                ${isActive ? 'bg-[#f29724] text-white shadow-lg shadow-orange-300 border-orange-300 ' : ''} 
                transition-transform duration-200 hover:scale-105 hover:shadow-lg shadow-orange-100`}
            >
              <img src={utensils} className="w-[30px] pe-3" alt="" /> 
              <span className="text-xl">Areas</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}