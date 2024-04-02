import React, { useState } from "react";
import { Card, Input, Checkbox, Typography } from "@material-tailwind/react";
import { DoAlert } from "../DoAlert";
import { useDispatch } from "react-redux";
import EditIcon from "../EditIcon";
import { IconButton } from "@material-tailwind/react";
import { TbEdit } from "react-icons/tb";
import { editBuilding, fetchBuildings } from "../../store/BuildingReducer";
export default function EditBuildingsModal({ UpBuilding }) {
  const [building, setBuilding] = useState({
    block: UpBuilding.block,
    floor: UpBuilding.floor,
    name: UpBuilding.name,
    status: UpBuilding.status,
  });

  const dispatch = useDispatch();

  const handleEdit = async (e) => {
    try {
      e.preventDefault();
      await dispatch(editBuilding(building.id, building)).then((response) => {
        dispatch(fetchBuildings());
      });
      dispatch(fetchBuildings());
      setShowModal(false);
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
      <IconButton
        className="shadow-none hover:shadow-none"
        style={{ color: "#00809d" }}
        onClick={() => setShowModal(true)}
      >
        <EditIcon />
      </IconButton>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none w-30">
              {/*header*/}
              <div className="flex justify-between p-5 rounded-t self-center gap-4">
                <h3 className="text-3xl font-semibold blue-color">
                  Edit Building
                </h3>
                <div className="self-center gap-5 bg-transparent text-xl">
                  <div className="self-center bg-transparent text-xl gap-5">
                    <TbEdit className="blue-color text-2xl" />
                  </div>
                </div>
              </div>
              {/*body*/}
              <Card
                color="transparent"
                shadow={false}
                className="flex items-center justify-end pt-4 px-6	 border-t border-solid border-slate-200 rounded-none"
              >
                <form className="mt-0.5 w-full max-w-screen-lg sm:w-96">
                  <div className=" flex flex-col gap-6 ">
                    <div className="w-full flex gap-4 flex-col">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                      >
                        Block Number
                        <span class="text-rose-500 ml-0.5">*</span>
                      </Typography>
                      <Input
                        type="number"
                        size="lg"
                        name="block"
                        value={building.block}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        onChange={data}
                      />
                    </div>
                    <div className="w-full flex gap-4 flex-col">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                      >
                        Floor Number
                        <span class="text-rose-500 ml-0.5">*</span>
                      </Typography>
                      <Input
                        type="number"
                        size="lg"
                        name="floor"
                        className="!border-t-blue-gray-200 focus:border-gray-200 focus:ring-transparent"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        value={building.floor}
                        onChange={data}
                      />
                    </div>
                    <div className="w-full flex gap-4 flex-col">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                      >
                        Building Name
                        <span class="text-rose-500 ml-0.5">*</span>
                      </Typography>
                      <Input
                        type="text"
                        size="lg"
                        name="name"
                        value={building.name}
                        className="!border-t-blue-gray-200 focus:border-gray-200 focus:ring-transparent"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        onChange={data}
                      />
                    </div>
                    <div className="w-full flex gap-4 flex-col">
                      <Checkbox
                        value={building.status}
                        className="!border-t-blue-gray-200 focus:border-gray-200 focus:ring-transparent blue-color"
                        onChange={(building.status = !building.status)}
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
                </form>
              </Card>
              {/*footer*/}
              <div className="flex w-full items-center justify-end pt-4 border-t border-solid mb-2 border-slate-200 rounded-none">
                <button
                  className="text-red-500 background-transparent font-medium mr-6 py-2 text-sm outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setBuilding({
                      block: "",
                      floor: "",
                      name: "",
                    });
                  }}
                >
                  Close
                </button>
                <button
                  className="text-green-600 border-green-600 hover:text-green-700 border mr-6	hover:border-green-700 w-1/2 gap-25 active:text-green-700 active:border-green-700 font-medium inline-flex px-3 py-2 text-center sm:w-auto text-sm rounded justify-center hover:shadow-lg  items-center mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleEdit}
                >
                  Save Modifications
                </button>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showSuccessAlert && (
        <DoAlert
          message={"Your new building was successfully added."}
          duration={500}
        />
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
