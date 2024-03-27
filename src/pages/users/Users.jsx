import React, { useEffect, useState } from 'react';
import UsersModal from './UsersModal';
import { GoDotFill } from "react-icons/go";
import DeleteModal  from '../DeleteModal';
import DoAlert from '../DoAlert';
import { useSelector, useDispatch } from 'react-redux';
import {  fetchUsers } from '../../store/UserReducer';
import EditUsersModal from'../users/EditUserModal';
export default function Users() {
    const users = useSelector((state) => {return state.users.users});
    const dispatch = useDispatch();

//Delete
const [showDeleteAlert, setShowDeleteAlert] = useState(false);

//get
useEffect(() => {
dispatch(fetchUsers());
}, [dispatch]);
   

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 m-4 h-full">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 userHeader">
      <div class="mb-1 w-full">
        <div class="mb-4">
            {/* <nav class="flex mb-5" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-2">
                <li class="inline-flex items-center">
                    <a href="#" class="text-gray-700 hover:text-gray-900 inline-flex items-center">
                    <svg class="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                    Home
                    </a>
                </li>
                <li>
                    <div class="flex items-center">
                    <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    <a href="#" class="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium">Users</a>
                    </div>
                </li>
                </ol>
            </nav> */}
            <h1 class="text-xl sm:text-2xl font-semibold text-gray-900">All users</h1>
        </div>
        <div class="sm:flex">
            <div class="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                <form class="lg:pr-3" action="#" method="GET">
                <div class="mt-1 relative lg:w-64 xl:w-96">
                    <input type="search" id="users-search" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-gray-600 block w-full p-2.5" placeholder="Search for users"/>
                </div>
                </form>
            </div>
<UsersModal  />
        </div>
    </div>        
      </header>
        {/* Table */}
        <div className="overflow-x-auto p-3 w-tab">
          <table className="table-auto w-full dark:text-slate-300 ">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr >
                <th className="p-2">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Address</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Phone Number</div>
                </th>
                {/* <th className="p-2">
                  <div className="font-semibold text-left">Birth Date</div>
                </th> */}
                <th className="p-2">
                  <div className="font-semibold text-left">Status</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Building </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Date</div>
                </th>
                <th className="p-2">
                  
                </th>
              </tr>
              
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {/* Row */}
              {Array.isArray(users) && users.map((user, index) => (             
                 <tr key={index}>
                <td className="p-2">
                  <div className="flex flex-col">
                    <div className="text-slate-800 dark:text-slate-100 flex items-center gap-5" >
      {user.name} </div>
      <div className="text-gray-400 text-sm" >
      {user.email}</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-left" >{user.address}</div>
                </td>
                <td className="p-2">
                  <div className="text-left" >{user.number}</div>
                </td>
                {/* <td className="p-2">
                  <div className="text-left" >{user.date}</div>
                </td> */}
                <td className="p-2">
                  <div className="text-left flex items-center" >
                  <div
                      style={{
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <GoDotFill 
                        style={{
                          color: user.active ? "rgb(16 185 129 / var(--tw-text-opacity))" : "rgba(255, 0, 0, 0.68)",
                        }}
                      />
                    </div>
                      {user.active ? 
                      <div 
                        style={{
                          color:"rgb(16 185 129 / var(--tw-text-opacity))" 
                        }}
                      >Active</div> 
    :<div 
                      style={{
                        color:"rgba(255, 0, 0, 0.68)" 
                      }}
                    >Offline</div> }

                    </div>
                </td>
                <td className="p-2">
                  <div className="text-left text-sky-500" >{user.building}</div>
                </td>
                <td className="p-2">
                <div className="flex flex-col">
                    <div className="text-slate-800 dark:text-slate-100 flex items-center gap-5" >
      {user.start} </div>
      <div className="text-slate-800 dark:text-slate-100 flex items-center" >
      {user.end}</div>
                  </div>
                </td>
                <td className="p-2 flex flex-row nowrap-flex justify-center gap-4 ">
                <DeleteModal user={user} msg={"user"} />
      <EditUsersModal UpUser={user}/>
      </td>
              </tr>

  ))}
            </tbody>
          </table>
        </div>
      
{showDeleteAlert && (
        <DoAlert message={ "Your user was successfully deleted."} duration={800}/>
      )}

    </div>
     
  );
}

