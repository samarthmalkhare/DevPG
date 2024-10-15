import React from "react";
import { useRouter } from "next/router";

const SidebarLogo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="
        rounded-full
        p-4
        flex
        items-center
        justify-start
        cursor-pointer
      "
    >
      <h1 className="text-white text-3xl font-bold">
        Dev
        <span className="bg-primary  rounded-md px-1 ml-1 text-black">Hub</span>
      </h1>
    </div>
  );
};

export default SidebarLogo;
