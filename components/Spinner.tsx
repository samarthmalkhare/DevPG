import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Spinner = () => {
  return (
    <div>
      <AiOutlineLoading3Quarters className="animate-spin h-10 w-10 text-gray-300" />
    </div>
  );
};

export default Spinner;
