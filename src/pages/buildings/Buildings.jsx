import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BuildingsModal from './BuildingsModal';
import { useSelector } from 'react-redux';
import { deleteBuilding, fetchBuildings  } from '../../store/BuildingReducer';
import DeleteBuild from './DeleteBuild';
import EditBuildingsModal from './EditBuildingsModal';
  function Buildings() {

    const buildings = useSelector((state) => state.buildings.buildings);
    const dispatch = useDispatch();
//Delete
const [showDeleteAlert, setShowDeleteAlert] = useState(false);

//get
useEffect(() => {
dispatch(deleteBuilding());
dispatch(fetchBuildings()); 
}, [dispatch]);

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 m-4 h-full ">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 userHeader">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Buildings List</h2>
        <BuildingsModal  />
      </header>
        {/* Table */}
        <div className="overflow-x-auto p-3 w-tab ">
          <table className="table-auto w-full dark:text-slate-300 w-80 align-last-center m-auto">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr >
                <th className="p-2">
                  <div className="font-semibold text-left">Block Number</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Floor Number</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Building Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center"></div>
                </th>
              </tr>
              
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {/* Row */}
              {Array.isArray(buildings) &&buildings.map((building) => (
              <tr key={building.id}>
                <td className="p-2">
                    <div className="text-center text-slate-800" >{building.block}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500" >{building.floor}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">{building.name}</div>
                </td>
                <td className="p-2 flex flex-row nowrap-flex justify-center gap-4 ">
                <DeleteBuild building={building} msg={"building"}  />
                <EditBuildingsModal UpBuilding={building}/>

      </td>
              </tr>

  ))}
            </tbody>
          </table>
        </div>
      </div>
      
     
  );
}

export default Buildings;
