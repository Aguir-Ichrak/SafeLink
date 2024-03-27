import React, { useState } from 'react';
import {
  Card,
  Input,
  Typography,
} from "@material-tailwind/react";
import { DoAlert } from '../DoAlert';
import {  addBuilding, fetchBuildings } from '../../store/BuildingReducer';
import { useDispatch } from 'react-redux';
import { BsBuildingFillGear } from "react-icons/bs";
export default function BuildingsModal() {
    const [building, setBuilding] = useState({
        block: "",
        floor: "",
        name: ""
      });

      const [selectedBlock, setSelectedBlock] = useState("01");
      const handleBlockChange = (e) => {
          setSelectedBlock(e.target.value);
          setBuilding({ ...building, block: e.target.value });
      };

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
            name: ""
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



const [showModal, setShowModal] = useState(false);
  return (
    <>
    <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => setShowModal(true)} type="button">
                    {/* <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg> */}
                    <img src='src/images/house.png'className="w-4 h-4 fill-current opacity-50 shrink-0"/>
                    <span className="hidden xs:block ml-2">Add Building</span>
                </button> 
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 max-w-6xl w-35">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex justify-between p-5 rounded-t self-center gap-4">
                  <h3 className="text-3xl font-semibold blue-color">
                    Building Form
                  </h3>
                  <div className="self-center"
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
                <Card color="transparent" shadow={false} className="flex flex-col nowrap-flex item-center">
        <form className="mt-8 mb-3 max-w-screen-lg w-80" method='POST'>
          <div className="mb-1 flex gap-6 flex-col item-center">
            <div className="w-60 flex gap-4 flex-col" >
          <Typography variant="h6" color="blue-gray" className="-mb-3" >
          Block Number
            </Typography>
            <select
                           value={selectedBlock}
                           onChange={handleBlockChange}
                          className="h-full"
                        >
                          <option value="01"> 01</option>
                          <option value="02">02</option>
                          <option value="03">03</option>
                        </select>
            {/* <Input
                        type='number'
              size="lg"
              name='block'
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={building.block}
              onChange={data}
              required
            /> */}
            </div>
              <div className="w-60 flex gap-4 flex-col" >
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
            <div className="w-60 flex gap-4 flex-col" >
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
          </div>
                          {/*footer*/}
                          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
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
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
            {showSuccessAlert && (
        <DoAlert message={ "Your new building was successfully added."} duration={500}/>
      )}
    </>
  );
}