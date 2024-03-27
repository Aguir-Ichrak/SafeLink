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
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Users List</h2>
        <UsersModal  />
      </header>
        {/* Table */}
        <div className="overflow-x-auto p-3 w-tab">
          <table className="table-auto w-full dark:text-slate-300 ">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr >
                <th className="p-2">
                  <div className="font-semibold text-center">Full Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Address</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">E_mail</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Phone Number</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Birth Date</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Building </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Start Date </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center"> End Date</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center"> </div>
                </th>
              </tr>
              
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {/* Row */}
              {Array.isArray(users) && users.map((user, index) => (             
                 <tr key={index}>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800 dark:text-slate-100 flex items-center gap-5" >
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
      {user.name}</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center" >{user.address}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">{user.email}</div>
                </td>
                <td className="p-2">
                  <div className="text-center" >{user.number}</div>
                </td>
                <td className="p-2">
                  <div className="text-center" >{user.date}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500" >{user.building}</div>
                </td>
                <td className="p-2">
                  <div className="text-center" >{user.start}</div>
                </td>
                <td className="p-2">
                  <div className="text-center" >{user.end}</div>
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

