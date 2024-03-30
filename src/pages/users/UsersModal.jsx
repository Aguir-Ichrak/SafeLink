import React, { useState } from "react";
import { Card, Input, Checkbox, Typography,Spinner } from "@material-tailwind/react";
import { DoAlert } from "../DoAlert";
import { addUser, fetchUsers } from "../../store/UserReducer";
import { useDispatch } from "react-redux";
import { FaUserCog } from "react-icons/fa";
import emailjs from "emailjs-com";

export default function UsersModal() {
  const [user, setUser] = useState({
    name: "",
    address: "",
    email: "",
    number: "",
    date: "",
    role: "user",
    active: false,
    building: "",
    start: "",
    end: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // State for managing loading state

  function generateRandomKey() {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let key = "";
    for (let i = 0; i < 8; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  }
  function sendEmail() {
    const serviceID = "safelink_service";
    const templateID = "template_ss8irxk";
    const userID = "PX4N5Qh9X307AciZP";
     
    emailjs
      .send(
        serviceID,
        templateID,
        {
          from_name: "SAFE_LINK",
          to_name: user.name,
          to_email:user.email,
          message:"Your login : "+user.email +"\n"+"Your password : "+ user.password,
        },
        userID
      )
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
        },
        (error) => {
          console.error("Error sending email:", error);
        }
      );
  }
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    setLoading(true);

      e.preventDefault();
      user.password = generateRandomKey();
       dispatch(addUser(user))
       .then(() => {
        console.log('sucesss')
        sendEmail()
      dispatch(fetchUsers());
      setShowModal(false);
      setUser({
        name: "",
        address: "",
        email: "",
        number: "",
        date: "",
        role: "user",
        active: false,
        building: "",
        start: "",
        end: "",
        password: "",
      });
        setLoading(false); // Hide loader when save operation completes
   
      })
    .catch((error) => {
        setLoading(false); // Hide loader if there's an error
        console.error("Error while saving changes:", error);
    });
      
   
  };

  const [selectedBuild, setSelectedBuild] = useState("01");
  const handleBuildChange = (e) => {
      setSelectedBuild(e.target.value);
      setUser({ ...user, building: e.target.value });
  };

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const data = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const [showModal, setShowModal] = useState(false);
  return (
    <>
                <div class="flex items-center space-x-2 sm:space-x-3 ml-auto">
                <button type="button" data-modal-toggle="add-user-modal" onClick={() => setShowModal(true)} class="bg-indigo-500 hover:bg-indigo-600 w-1/2 text-white gap-25 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                <img
          src="src/images/add-user.png"
          className="w-5 h-5 fill-current opacity-50 shrink-0"
        />
                            Add User
                </button>
            </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none w-40">
              {/*header*/}
              <div className="flex justify-between p-5 rounded-t self-center gap-4">
                <h3 className="text-3xl font-semibold blue-color" >User Form</h3>
                <div className="self-center gap-5 bg-transparent text-xl">
  <FaUserCog
className="blue-color"
  />
</div>
              </div>
              {/*body*/}
              <Card
                color="transparent"
                shadow={false}
                 className="flex items-center justify-end pt-4 px-6	 border-t border-solid border-slate-200 rounded-none">
                <form className="mt-0.5  w-full max-w-screen-lg sm:w-96">
                  <div className=" flex flex-col gap-6 ">
                    <div className="justify-between container flex gap-04">
                      <div className="w-60 flex gap-4 flex-col">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="-mb-3"
                        > 
                          Full Name
                        <span class="text-rose-500 ml-0.5">*</span>
                        </Typography>
                        <Input
                          type="text"
                          size="lg"
                          name="name"
                          className="!border-t-blue-gray-200 focus:border-gray-200 focus:ring-transparent"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                          value={user.name}
                          onChange={data}
                        />
                      </div>
                      <div className="w-60 flex gap-4 flex-col">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="-mb-3"
                        >
                          Address
                          <span class="text-rose-500 ml-0.5">*</span>
                        </Typography>
                        <Input
                          type="text"
                          size="lg"
                          name="address"
                          className="!border-t-blue-gray-200 focus:border-gray-200 focus:ring-transparent"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                          value={user.address}
                          onChange={data}
                        />
                      </div>
                    </div>
                    <div className="justify-between container flex gap-04">
                      <div className="w-60 flex gap-4 flex-col">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="-mb-3"
                        >
                          E_mail
                          <span class="text-rose-500 ml-0.5">*</span>
                        </Typography>
                        <Input
                          type="email"
                          size="lg"
                          name="email"
                          placeholder="name@mail.com"
                          className="!border-t-blue-gray-200 focus:border-gray-200 focus:ring-transparent"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                          value={user.email}
                          onChange={data}
                        />
                      </div>
                      <div className="w-60 flex gap-4 flex-col">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="-mb-3"
                        >
                          Phone Number
                          <span class="text-rose-500 ml-0.5">*</span>
                        </Typography>
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
                    <div className="justify-between container flex gap-04">
                      <div className="w-full flex gap-4 flex-col">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="-mb-3"
                        >
                          Birth Date
                        </Typography>
                        <Input
                          type="date"
                          size="lg"
                          name="date"
                          className="!border-t-blue-gray-200 focus:border-gray-200 focus:ring-transparent"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                          value={user.date}
                          onChange={data}
                        />
                      </div>
                      </div>
                    <div className="justify-between container flex gap-04">
                      <div className="w-60 flex gap-3 flex-col">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="-mb-3"
                        >
                          Building
                          <span class="text-rose-500 ml-0.5">*</span>
                        </Typography>
                        <select
                          value={selectedBuild}
                          onChange={handleBuildChange}
                          className="h-full rounded-md"
                        >
                          <option value="01"> 01</option>
                          <option value="02">02</option>
                          <option value="03">03</option>
                        </select>
                      </div>
                      <div className="w-60 flex gap-4 flex-col">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="-mb-3"
                        >
                          Start Date
                          <span class="text-rose-500 ml-0.5">*</span>
                        </Typography>
                        <Input
                          type="date"
                          size="lg"
                          name="start"
                          className="!border-t-blue-gray-200 focus:border-gray-200 focus:ring-transparent"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                          value={user.start}
                          onChange={data}
                        />
                      </div>
                      <div className="w-60 flex gap-4 flex-col">
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="-mb-3"
                        >
                          End Date
                          <span class="text-rose-500 ml-0.5">*</span>
                        </Typography>
                        <Input
                          type="date"
                          size="lg"
                          name="end"
                          className="!border-t-blue-gray-200 focus:border-gray-200 focus:ring-transparent"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                          value={user.end}
                          onChange={data}
                        />
                      </div>
                    </div>
                    <div className="w-60 flex gap-4 flex-col">
                        <Checkbox
                          value={user.active}
                          className="!border-t-blue-gray-200 focus:border-gray-200 focus:ring-transparent blue-color"
                          onChange={()=>{ user.active=!user.active}}
                          label={
                            <Typography
                              variant="h6"
                              color="blue-gray"
                              className="flex items-center font-normal font-w"
                            >
                              Active User
                            </Typography>
                          }
                          containerProps={{ className: "-ml-2.5" }}
                        />
                      </div>
                  </div>
                </form>
              </Card>
              {/*footer*/}
              <div className="flex w-full items-center justify-end pt-4 border-t border-solid mb-2 border-slate-200 rounded-none">
                    <button
                      className="text-red-500 background-transparent font-medium mr-6 py-2 text-sm outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setUser({
                          name: "",
                          address: "",
                          email: "",
                          number: "",
                          date: "",
                          role: "user",
                          active: false,
                          building: "",
                          start: "",
                          end: "",
                          password: "",
                        });
                      }}
                    >
                      Close
                    </button>
                    <button
                      className="text-green-600 border-green-600 hover:text-green-700 border mr-6	hover:border-green-700 w-1/2 gap-25 active:text-green-700 active:border-green-700 font-medium inline-flex px-3 py-2 text-center sm:w-auto text-sm rounded justify-center hover:shadow-lg  items-center mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      onClick={handleSubmit}
                    >
                    Save User {loading ? <Spinner  size="small" color="blue" />: null}  
                    </button>
                  </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showSuccessAlert &&
        ((
          <DoAlert
            message={"Your new user was successfully added."}
            duration={500}
          />
        ),
        setShowSuccessAlert(false))}
    </>
  );
}
