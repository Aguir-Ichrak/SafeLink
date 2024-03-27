import React, { useState } from 'react';

import Header from '../partials/Header';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import SidebarAdmin from '../partials/SidebareAdmin';



function DashboardAdmin() {
// const handelOpenModalAddPost=()=>{
//   setAddModalOpen(true)
// }
  const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [addModalOpen, setAddModalOpen] = useState(false);

  return (

        <main >
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto" >

            {/* <WelcomeBanner /> */}

            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* <Datepicker /> */}

               {/* <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={handelOpenModalAddPost}>
                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden xs:block ml-2">Add Post</span>
                </button>            */}
              </div>

            </div>

            <div className="grid grid-cols-12 gap-6">
              <DashboardCard04 />
              <DashboardCard06/>
              


              {/* {addModalOpen ===true ?  <ModalAdd></ModalAdd>: ''} */}
            </div>
          </div>
        </main>


  );
}

export default DashboardAdmin;