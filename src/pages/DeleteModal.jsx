import React, { useState } from "react";
import { IconButton } from "@material-tailwind/react";
import TrashIcon from "./DeleteIcon";
import { useDispatch } from "react-redux";
import { deleteUser } from "../store/UserReducer";
export default function DeleteModal({ user,msg }) {
  const [showDeleteModal, setshowDeleteModal] = useState(false);

const dispatch = useDispatch();
const handleDeleteUser = async (e) => {
    e.preventDefault();
  try {
    await dispatch(deleteUser(user.id)).then((response) => {
        console.log("response---", response);

      //   if(response.ok){
    });
    setshowDeleteModal(false);
    }
catch (error) {
    console.error("Failed to delete user:", error);
  }
};

  return (
    <>
     <IconButton className="shadow-none" style={{color:"#ff0000ad"}}  type="button" onClick={() => {
                        setshowDeleteModal(true)
                      }} >
                <TrashIcon />
      </IconButton>
      
      {showDeleteModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Are you sure to delete {user.name} ?
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setshowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleDeleteUser}
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
