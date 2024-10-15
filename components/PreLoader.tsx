import React from "react";

const PreLoader = () => {
  return (
    <div className="w-full h-screen rounded-full p-4 flex items-center justify-center cursor-pointer">
      <h1 className="text-white text-4xl font-bold animate-pulse">
        Dev
        <span className="bg-primary  rounded-md px-1 ml-1 text-black">Hub</span>
      </h1>
    </div>
  );
};

export default PreLoader;
