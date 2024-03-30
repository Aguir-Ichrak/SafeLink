import React, { useState } from "react";
import { LiaUserSlashSolid } from "react-icons/lia";
import { PiUserSwitchThin } from "react-icons/pi";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import Datepicker from "../components/Datepicker";
import { BsBuildingLock, BsBuildingSlash } from "react-icons/bs";

import DashboardCard05 from "../partials/dashboard/DashboardCard05";
import DashboardCard08 from "../partials/dashboard/DashboardCard08";
import PostModal from "./posts/PostModal";
import DashboardCard04 from "../partials/dashboard/DashboardCard04";
import DashboardCard06 from "../partials/dashboard/DashboardCard06";
import { useSelector } from "react-redux";

function Dashboard() {
  const curentUser = useSelector((state) => {
    return state.users.curentUser;
  });

  // const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <WelcomeBanner />

        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            <Datepicker />

            <PostModal />
          </div>
        </div>
        {curentUser && curentUser.role == "admin" ? (
          <div className="grid grid-cols-12 gap-6">
            <DashboardCard05 />
            <DashboardCard08 />
          </div>
        ) : null}

        {curentUser && curentUser.role == "user" ? (
         
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-sm border border-slate-200	col-span-1 sm:col-span-1 mb-6	 p-5 items-center shadow-lg dark:border-slate-700 dark:bg-slate-800 flex justify-between">
                <div>
                  <h5 class="text-2xl font-semibold text-gray-600 dark:text-white">
                    82
                  </h5>
                  <span className="text-sm	text-slate-400 uppercase">
                    active users
                  </span>
                </div>
                <div className="bg-transparent">
                  <PiUserSwitchThin className="text-indigo-200 text-7xl dark:text-indigo-500	" />
                </div>
              </div>
              <div className="bg-white rounded-sm border border-slate-200	col-span-1 sm:col-span-1 mb-6	 p-5 items-center shadow-lg dark:border-slate-700 dark:bg-slate-800 flex justify-between">
                <div>
                <h5 class="text-2xl font-semibold text-gray-600 dark:text-white">
                    82
                  </h5>
                  <span className="text-sm	text-slate-400 uppercase">
                    inactive users
                  </span>
                </div>
                <div className="bg-transparent">
                  <LiaUserSlashSolid className="text-indigo-200 text-6xl dark:text-indigo-500	" />
                </div>
              </div>
              <div className="bg-white rounded-sm border border-slate-200	col-span-1 sm:col-span-1 mb-6	 p-5 items-center shadow-lg dark:border-slate-700 dark:bg-slate-800 flex justify-between">
                <div>
                <h5 class="text-2xl font-semibold text-gray-600 dark:text-white">
                    82
                  </h5>
                  <span className="text-sm	text-slate-400 uppercase">
                    available buildings
                  </span>
                </div>
                <div className="bg-transparent">
                  <BsBuildingSlash className="text-indigo-200 text-5xl dark:text-indigo-500	" />
                </div>
              </div>
              <div className="bg-white rounded-sm border border-slate-200	col-span-1 sm:col-span-1 mb-6	 p-5 items-center shadow-lg dark:border-slate-700 dark:bg-slate-800 flex justify-between">
                <div>
                <h5 class="text-2xl font-semibold text-gray-600 dark:text-white">
                    82
                  </h5>
                  <span className="text-sm	text-slate-400 uppercase">
                    reserved buildings
                  </span>
                </div>
                <div className="bg-transparent">
                  <BsBuildingLock className="text-indigo-200 text-5xl dark:text-indigo-500	" />
                </div>
              </div>
            </div>
          
        ) : null}
         {curentUser && curentUser.role == "user" ? (
         
       
         <div className="grid grid-cols-12 gap-6 w-full">
           <DashboardCard04 />
           <DashboardCard06 />
         </div>
     ) : null}
      </div>
    </main>

    // </div>
    // </div>
  );
}

export default Dashboard;
