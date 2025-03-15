import React from 'react';
import styles from './LayOut.module.scss'; 
import SideBar from '../SideBar/SideBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function LayOut() {
  return (
    <>
      <div className="flex min-h-screen">
        <SideBar />
        <div className="flex-grow bg-[#f4f2ee] md:ms-[250px]"> 
          <div className="container mx-auto px-4">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}