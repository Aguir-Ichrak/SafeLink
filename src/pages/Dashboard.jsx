import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import Datepicker from '../components/Datepicker';

import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import ModalAdd from './Modal';
import  PostModal  from './posts/PostModal';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import { useSelector } from 'react-redux';


function Dashboard() {
  const curentUser = useSelector((state) => {return state.users.curentUser});

  // const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            <WelcomeBanner />

            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <Datepicker />

<PostModal/>          
              </div>

            </div>
            {curentUser && curentUser.role=='user' ? 
            <div className="grid grid-cols-12 gap-6">
              <DashboardCard05 />
              <DashboardCard08 />
            </div> :null}

            {curentUser && curentUser.role=='admin' ? 
            <div className="grid grid-cols-12 gap-6 w-full">
              <DashboardCard04 />
              <DashboardCard06/> 
            </div> 
             :null} 
          </div>
        </main>

      // </div>
    // </div>
  );
}

export default Dashboard;