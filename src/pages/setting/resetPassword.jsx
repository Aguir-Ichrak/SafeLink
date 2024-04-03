import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCurrentUser } from "../../store/UserReducer";
import {  Spinner ,Alert} from "@material-tailwind/react";

import reset from "../../images/reset.jpg";
function ResetPassword() {
  const dispatch = useDispatch();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const currentUser = useSelector((state) => {
    return state.users.curentUser;
  });
  // const [userUpdate, setuserUpdate] = useState({});
  // useEffect(() => {
  //   setuserUpdate(currentUser);
  // }, [currentUser]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [succes, setSucces] = useState(false);
  
  const validUserProfile = () => {
    setErrors(null)
    setLoading(true);
    let userUpdate=currentUser
    if (
      currentPassword == currentUser.password &&
      newPassword == confirmPassword
    ) {
    userUpdate.password = newPassword;

      //call api to update user data
      console.log("ghhjjgfddd",userUpdate);
      dispatch(editCurrentUser(userUpdate.id, userUpdate))
        .then(() => {
          console.log("sucesss");
          setLoading(false);
          setSucces(true) ;
          setTimeout(() => {
            setSucces(false)
          }, 2000);
        })
        .catch((error) => {
          setLoading(false); // Hide loader if there's an error
          console.error("Error while saving changes:", error);
        });
    } else {
    setLoading(false);

      if(currentPassword != currentUser.password){
        setErrors('Invalid current Password')
      }else{
        setErrors('New Password And Confirm Password Does Not Match')
      }

    }
  };


  // const data = (e) => {
  //   const { name, value } = e.target;
  //   setuserUpdate((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  return (
    <div className="bg-white h-full">
      <div className="flex relative h-full">
        <div className="w-1/2 ">
          <div className="flex min-h-dvh flex-col h-full">
            <div className="flex items-center justify-between cj3hv h-16 px-4">
              <a className="block" href="/dashboard">
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <defs>
                    <linearGradient
                      x1="28.538%"
                      y1="20.229%"
                      x2="100%"
                      y2="108.156%"
                      id="logo-a"
                    >
                      <stop
                        stopColor="#A5B4FC"
                        stopOpacity="0"
                        offset="0%"
                      ></stop>
                      <stop stopColor="#A5B4FC" offset="100%"></stop>
                    </linearGradient>
                    <linearGradient
                      x1="88.638%"
                      y1="29.267%"
                      x2="22.42%"
                      y2="100%"
                      id="logo-b"
                    >
                      <stop
                        stopColor="#38BDF8"
                        stopOpacity="0"
                        offset="0%"
                      ></stop>
                      <stop stopColor="#38BDF8" offset="100%"></stop>
                    </linearGradient>
                  </defs>
                  <rect fill="#6366F1" width="32" height="32" rx="16"></rect>
                  <path
                    d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                    fill="#4F46E5"
                  ></path>
                  <path
                    d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                    fill="url(#logo-a)"
                  ></path>
                  <path
                    d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                    fill="url(#logo-b)"
                  ></path>
                </svg>
              </a>
            </div>
          
            <div className="max-w-96 m-auto	w-1/2">
            
              <div className="text-xl text-slate-800 dark:text-slate-100 font-bold mb-6">
                Reset your Password ✨
              </div>
              <form>
                <div>
                  <div className="mb-4">
                    <label className="text-xs font-medium" htmlFor="pass">
                      Current Password
                      <span className="text-rose-500 ml-0.5">*</span>
                    </label>
                    <input
                      id="pass"
                      className="bg-slate-100 dark:bg-transparent item-center dark:border-slate-700 border-slate-200 focus:bg-slate-200 py-2 px-3 text-sm focus:border-slate-200 hover:border-slate-200 focus:ring-transparent rounded text-slate-800 w-full dark:bg-slate-900 dark:focus:bg-slate-800 dark:focus:border-slate-600 dark:hover:border-slate-600 dark:hover:bg-slate-900"
                      type="password"
                      name="currentPassword"
                      autoComplete="current-password"
                        value={currentPassword}
                      onChange={(e) => {
                        setCurrentPassword(e.target.value)
                      }}
                      //   onChange={data}
                      required
                    />
                  </div>
                  <div className="mb-4 font-medium">
                    <label className="text-xs" htmlFor="newPass">
                      New Password{" "}
                      <span className="text-rose-500 ml-0.5">*</span>
                    </label>
                    <input
                      id="newPass"
                      className="bg-slate-100 dark:bg-transparent item-center dark:border-slate-700 border-slate-200 focus:bg-slate-200 py-2 px-3 text-sm focus:border-slate-200 hover:border-slate-200 focus:ring-transparent rounded text-slate-800 w-full dark:bg-slate-900 dark:focus:bg-slate-800 dark:focus:border-slate-600 dark:hover:border-slate-600 dark:hover:bg-slate-900"
                      type="password"
                        value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                      }}
                      autoComplete="new-password"
                      name="newPassword"
                      required
                    />
                  </div>
                  <div className="mb-4 font-medium	">
                    <label className="text-xs" htmlFor="ConfNewPass">
                      Confirm Password
                      <span className="text-rose-500 ml-0.5">*</span>
                    </label>
                    <input
                      id="ConfNewPass"
                      className="bg-slate-100 dark:bg-transparent item-center dark:border-slate-700 border-slate-200 focus:bg-slate-200 py-2 px-3 text-sm focus:border-slate-200 hover:border-slate-200 focus:ring-transparent rounded text-slate-800 w-full dark:bg-slate-900 dark:focus:bg-slate-800 dark:focus:border-slate-600 dark:hover:border-slate-600 dark:hover:bg-slate-900"
                      type="password"
                      value={confirmPassword}
                      autoComplete="confirm-password"
                      name="confirmPassword"
                      required
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6 ">
                  <button
                  type="button"
                    className="btn whitespace-nowrap bg-indigo-500 text-white h-[40px]"
                     onClick={(e) => {
                      e.preventDefault();
                    validUserProfile();
                  }}
                  >
                    Reset Password {loading ? <Spinner size="small" color="blue" className="ml-2"/> : null}
                  </button>

                </div>
            
                {errors &&    <Alert
      className="rounded-none border-l-4 mb-4 mt-4 border-[red] bg-[red]/10 font-medium text-[#red]"
    >
      {errors}
    </Alert>}
              </form>
              {succes &&    <Alert
      className="rounded-none border-l-4 mb-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]"
    >
      password changed successfully
    </Alert>}
            </div>
         
          </div>
        </div>

        <img
          className="object-center bottom-0 right-0 top-0  object-cover h-full w-1/2"
          src={reset}
        />
      </div>
    </div>
  );
}
export default ResetPassword;
