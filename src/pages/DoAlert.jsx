import { Alert } from "@material-tailwind/react";
import { useEffect, useState } from "react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function DoAlert({message,duration}) {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const hideAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
     {showAlert && (
     <Alert variant="ghost" icon={<Icon />}
      className="  bg-[#2ec946]/10 font-medium text-[#2ec946] w-30 justify-center"
      onClose={hideAlert}
    >
        <span>{message}</span>
      </Alert>
      )} 

       
       
    </div>
  );
}

export default DoAlert;

