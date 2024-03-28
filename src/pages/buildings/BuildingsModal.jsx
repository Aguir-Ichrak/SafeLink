import React, { useState } from 'react';
import {
  Card,
  Input,
  Typography,
  Checkbox
} from "@material-tailwind/react";
import { DoAlert } from '../DoAlert';
import {  addBuilding, fetchBuildings } from '../../store/BuildingReducer';
import { useDispatch } from 'react-redux';
import { BsBuildingFillGear } from "react-icons/bs";
import userReducer from '../../store/UserReducer';
export default function BuildingsModal() {
    const [building, setBuilding] = useState({
        block: "",
        floor: "",
        name: "",
        status:false
      });

      const dispatch = useDispatch();
      const handleSubmit = async (e) => {
        try {
          e.preventDefault();
          await dispatch(addBuilding(building)).then((response) => {
            console.log("response---", response);
            //   if(response.ok){
          });
          dispatch(fetchBuildings());
          setShowModal(false);
          setBuilding
            ({
            block: "",
            floor: "",
            name: "",
            status:false
          });
        } catch (error) {
          console.error("Failed to add building:", error);
        }
      };
    
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // État pour afficher l'alerte de succès


//load false
const data = (e) => {
  const { name, value } = e.target;
  setBuilding({ ...building, [name]: value });
};

const [checked, setChecked] = useState(true);
const handleCheckboxChange = () => {
  setChecked(!checked);
};

const [showModal, setShowModal] = useState(false);
  return (
    <>
                <div class="flex items-center space-x-2 sm:space-x-3 ml-auto">
                <button type="button" data-modal-toggle="add-user-modal" onClick={() => setShowModal(true)} class="bg-indigo-500 hover:bg-indigo-600 w-1/2 text-white gap-25 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                <img src='src/images/house.png'className="w-4 h-4 fill-current opacity-50 shrink-0"/>Add Building      
                          </button>
            </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none w-50">
                {/*header*/}
                <div className="flex justify-between p-5 rounded-t self-center gap-4">
                  <h3 className="text-3xl font-semibold blue-color">
                    Building Form
                  </h3>
                  <div className="self-center gap-5"
  style={{
    backgroundColor: "transparent",
    fontSize:"x-large"  }}
>
  <BsBuildingFillGear
className='blue-color'
  />
</div>
                </div>
                {/*body*/}
                <Card
                color="transparent"
                shadow={false}
                className="flex flex-col nowrap-flex item-center"
              >   
                <form className="my-6 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6 ">
                <div className="w-60 flex gap-4 flex-col">
          <Typography variant="h6" color="blue-gray" className="-mb-3" >
          Block Number
            </Typography>
            <Input
            type='number'
            size="lg"
            name='block'
            value={building.block}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={data}
              required
            />
            </div>
            <div className="w-60 flex gap-4 flex-col">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
            Floor Number
            </Typography>
            <Input
              type='number'
              size="lg"
              name='floor'
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={building.floor}
              onChange={data}
              required
            />
            </div>
            {/* <div className="justify-between container flex gap-04"> */}
            <div className="w-60 flex gap-4 flex-col">
<Typography variant="h6" color="blue-gray" className="-mb-3">
            Building Name
            </Typography>
            <Input
            type='text'
            size="lg"
            name='name'
            value={building.name}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={data}
              required
            />
            </div>
            <div className="w-60 flex gap-4 flex-col">
                        <Checkbox
                          style={{ color: "rgb(0, 128, 157)" }}
                          value={building.status}
                          onChange={()=>building.status=!building.status}
                          label={
                            <Typography
                              variant="h6"
                              color="blue-gray"
                              className="flex items-center font-normal font-w"
                            >
                              Available
                            </Typography>
                          }
                          containerProps={{ className: "-ml-2.5" }}
                        />
                      </div>
          {/* </div> */}
          </div>

                          {/*footer*/}
                          <div className="flex items-center justify-end pt-4 border-t border-solid border-blueGray-200 rounded-b">
                  {/* loader if var loading =true */}
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() =>{ setShowModal(false);     
                      setBuilding(
                      { 
                        block: "",
                        floor: "",
                        name: ""
                  })}}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Save Building
                  </button>
                </div>
        </form>
      </Card>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
            {showSuccessAlert && ((
        <DoAlert message={ "Your new building was successfully added."} duration={500}/>
      ),
      setShowSuccessAlert(false))}

    </>
  );
}