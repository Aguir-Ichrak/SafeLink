import React, { useEffect, useState } from "react";
import { Card, Input, Checkbox, Typography } from "@material-tailwind/react";
import { DoAlert } from "../DoAlert";
import { useDispatch } from "react-redux";
import EditIcon from "../EditIcon";
import {IconButton} from "@material-tailwind/react";
import { BsBuildingFillGear } from "react-icons/bs";
import { editBuilding, fetchBuildings } from "../../store/BuildingReducer";
export default function EditBuildingsModal({ UpBuilding }) {
  const [building, setBuilding] = useState({
    block: UpBuilding.block,
    floor: UpBuilding.floor,
    name: UpBuilding.name,
    status :UpBuilding.status
  });

  const [checked, setChecked] = useState(true);
  const handleCheckboxChange = () => {
    setChecked(!checked);
  };
  const dispatch = useDispatch();

  const handleEdit = async (e) => {
    try {
      e.preventDefault();
      await dispatch(editBuilding(building.id,building)).then((response) => {
        console.log("response---", response);
        dispatch(fetchBuildings());  
      });
      dispatch(fetchBuildings());
      setShowModal(false);
      console.log(building);
    } catch (error) {
      console.error("Failed to add building:", error);
    }
  };

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const data = (e) => {
    const { name, value } = e.target;
      setBuilding({ ...UpBuilding, [name]: value });
    };
  const [showModal, setShowModal] = useState(false);
  return (
    <>
 <IconButton  className="shadow-none" style={{color:"#00809d"}} onClick={() => setShowModal(true)}>
      <EditIcon />
      </IconButton>
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
                <Card color="transparent" shadow={false} className="flex flex-col nowrap-flex item-center">
        <form className="mt-8 mb-3 max-w-screen-lg w-80" method='POST'>
          <div className="mb-3 flex gap-6 flex-col item-center">
            <div className="w-60 flex gap-4 flex-col" >
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
            <div className="w-60 flex gap-4 flex-col">
                        <Checkbox
                          style={{ color: "rgb(0, 128, 157)" }}
                          checked={building.status}
                          onChange={handleCheckboxChange}
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
                    onClick={handleEdit}
                  >
                    Save Modifications
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
