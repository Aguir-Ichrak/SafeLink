import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCurrentUser } from "../../store/UserReducer";
import {  Input,Spinner   } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const curentUser = useSelector((state) => {return state.users.curentUser});
    const [profileData, setProfileData] = useState({});
    const [loading, setLoading] = useState(false); // State for managing loading state

const validUserProfile = ()=>{
    setLoading(true);
    //call api to update user data
    dispatch(editCurrentUser(profileData.id,profileData))
    .then(() => {
        console.log('sucesss')
        setLoading(false); // Hide loader when save operation completes
    })
    .catch((error) => {
        setLoading(false); // Hide loader if there's an error
        console.error("Error while saving changes:", error);
    });
}
const navigateToResetPassword=()=>{
    navigate('/setting/reste-password')
}
const data = (e) => {
    const { name, value } = e.target;
    setProfileData(prevState => ({
        ...prevState,
        [name]: value
    }));
};
    useEffect(()=>{
        setProfileData(curentUser)
},[curentUser])
return (
<div class="cewy4 clpyc cj3hv cofxq c3ff8 c9r0z c0ycj ml-4 mr-4 mt-4">

<div class="ce97l mb-6">

    <h1 class="text-slate-800 dark:text-slate-100 font-bold cy709 cjefr">Account Settings ✨</h1>

</div>

<div class="bg-white dark:bg-slate-800 rounded-sm cetne ce97l">

    
        <div class="ckut6 p-4">

            <div class="c3goj caod7 mb-4">
               

                <section>
                    <h3 class="text-slate-800 dark:text-slate-100 font-bold ctbo0 cvvcr ci4cg">Business Profile</h3>
                    <div class="text-sm">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.</div>
                    <div class="flex item-center mt-3 gap-4">
                        <div class="w-[49%]">
                            <label class="block text-sm cw92y ci4cg" for="name">Full Name</label>
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
                        <div class="w-[49%]">
                            <label class="block text-sm cw92y ci4cg" for="business-id">Adress</label>
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
                        />                        </div>
                    </div>
                    <div class="flex item-center mt-2 gap-4">
                        <div class="w-[49%]">
                            <label class="block text-sm cw92y ci4cg" for="name">E_mail</label>
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
                        />                        </div>
                        <div class="w-[49%]">
                            <label class="block text-sm cw92y ci4cg" for="business-id">Phone number</label>
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
                        />                        </div>
                    </div>
                    <div class="flex item-center mt-2 gap-4">
                        <div class="w-[100%]">
                            <label class="block text-sm cw92y ci4cg" for="name">Birth Date</label>
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
                        />                        </div>
                     
                    </div>
                </section>

             

                <section className="mt-4">
                    <h3 class="text-slate-800 dark:text-slate-100 font-bold ctbo0 cvvcr ci4cg">Password</h3>
                    <div class="text-sm">You can set a permanent password if you don't want to use temporary login codes.</div>
                    <div class="cggtb mt-2">
                        <button class="btn border-slate-200 dark:border-slate-700 text-indigo-500 c46uo cm7vt cl0q9" fdprocessedid="x145hg" onClick={()=>{navigateToResetPassword()}}>Set New Password</button>
                    </div>
                </section>

                
            </div>

            <footer>
                <div class="flex border-slate-200 dark:border-slate-700 chmlm c87xd cdsqp c7s20 mt-4">
                    <div class="flex c93ao w-full justify-end">
                        <button class="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 c46uo cm7vt ch1ih c6w4h" fdprocessedid="6ir3yo" onClick={()=>{setProfileData(curentUser)}}>Cancel</button>
                        <button class="btn ml-3 cfeqx cf1ce ceqwg" fdprocessedid="8lwmjl" onClick={()=>{validUserProfile()}}>Save Changes {loading ? <Spinner  size="small" color="blue" />: null}</button>
                    </div>
                </div>
            </footer>

        </div>

  
</div>

</div>
)
}

