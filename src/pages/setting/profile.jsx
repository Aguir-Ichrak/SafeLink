import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCurrentUser } from "../../store/UserReducer";
import { Input, Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const curentUser = useSelector((state) => {
    return state.users.curentUser;
  });
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(false); // State for managing loading state

  const validUserProfile = () => {
    setLoading(true);
    //call api to update user data
    dispatch(editCurrentUser(profileData.id, profileData))
      .then(() => {
        console.log("sucesss");
        setLoading(false); // Hide loader when save operation completes
      })
      .catch((error) => {
        setLoading(false); // Hide loader if there's an error
        console.error("Error while saving changes:", error);
      });
  };
  const navigateToResetPassword = () => {
    navigate("/settings/reset-password");
  };
  const data = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    setProfileData(curentUser);
  }, [curentUser]);
  return (
    <div className="cj3hv ml-4 mr-4 mt-4">
      <div className=" mb-6">
        <h1 className="text-xl text-slate-800 dark:text-slate-100 font-bold">
          Account Settings ✨
        </h1>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-sm cetne ">
        <div className="p-6">
          <div className="mb-4">
            <section>
              <div className="flex item-center gap-2">
                <img
                  className="w-8 h-8 rounded-full"
                  src="src/images/signin.jpg"
                  width="20"
                  height="20"
                />
                <h3 className="text-slate-800 dark:text-slate-100 font-bold ctbo0 cvvcr ci4cg">
                  Profile
                </h3>
              </div>

              <div className="flex item-center mt-4 gap-4">
                <div className="w-[49%]">
                  <label className="block text-sm cw92y ci4cg" >
                    Full Name
                  </label>
                  <Input
                    type="text"
                    size="lg"
                    name="name"
                    className="!border-t-blue-gray-200 focus:border-gray-200 focus:ring-transparent"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={profileData.name}
                    onChange={data}
                  />
                </div>
                <div className="w-[49%]">
                  <label className="block text-sm cw92y ci4cg" >
                    Adress
                  </label>
                  <Input
                    type="text"
                    size="lg"
                    name="address"
                    className="!border-t-blue-gray-200 focus:border-gray-200 focus:ring-transparent"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={profileData.address}
                    onChange={data}
                  />
                </div>
              </div>
              <div className="flex item-center mt-3 gap-4">
                <div className="w-[49%]">
                  <label className="block text-sm cw92y ci4cg" >
                    E_mail
                  </label>
                  <Input
                    type="email"
                    size="lg"
                    name="email"
                    placeholder="name@mail.com"
                    className="!border-t-blue-gray-200 focus:border-gray-200 focus:ring-transparent"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={profileData.email}
                    onChange={data}
                  />
                </div>
                <div className="w-[49%]">
                  <label className="block text-sm cw92y ci4cg" >
                    Phone number
                  </label>
                  <Input
                    type="text"
                    size="lg"
                    name="number"
                    placeholder="94 1** ***"
                    className="!border-t-blue-gray-200 focus:border-gray-200 focus:ring-transparent"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={data}
                  />
                </div>
              </div>
              <div className="flex item-center mt-3 gap-4">
                <div className="w-[100%]">
                  <label className="block text-sm cw92y ci4cg" >
                    Birth Date
                  </label>
                  <Input
                    type="date"
                    size="lg"
                    name="date"
                    className="!border-t-blue-gray-200 focus:border-gray-200 focus:ring-transparent"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={profileData.date}
                    onChange={data}
                  />
                </div>
              </div>
            </section>

            <section className="mt-5">
              <h3 className="text-slate-800 dark:text-slate-100 font-bold ctbo0 cvvcr ci4cg">
                Password
              </h3>
              <div className="text-sm">
                You can set a permanent password if you don't want to use
                temporary login codes.
              </div>
              <div className="cggtb mt-3">
                <button
                  className="px-2	py-1.5 text-xs rounded border-slate-200	border dark:border-slate-700 text-indigo-500"
                  fdprocessedid="x145hg"
                  onClick={() => {
                    navigateToResetPassword();
                  }}
                >
                  Set New Password
                </button>
              </div>
            </section>
          </div>

          <footer>
            <div className="flex border-slate-200 dark:border-slate-700 chmlm c87xd cdsqp c7s20 mt-4">
              <div className="flex c93ao w-full justify-end">
                <button
                  className="px-2	py-1.5 rounded dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-xs"
                  fdprocessedid="6ir3yo"
                  onClick={() => {
                    setProfileData(curentUser);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-2	py-1.5 rounded ml-3 bg-indigo-500 text-xs text-white"
                  fdprocessedid="8lwmjl"
                  onClick={() => {
                    validUserProfile();
                  }}
                >
                  Save Changes
                  {loading ? <Spinner size="small" color="blue" /> : null}
                </button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
