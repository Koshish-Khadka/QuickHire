import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "store/store";

const Profileheader = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className="border bg-white p-4 rounded-md shadow">
      <h1 className="text-2xl font-semibold mb-4">
        Welcome back, {user?.firstName} {user?.lastName}!
      </h1>
      <p className="text-gray-500 mt-1 text-sm">
        lorea ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Est quisquam quis necessitatibus quasi mollitia modi
        pariatur quibusdam magnam voluptatem odio cum, esse officia, veritatis
        reprehenderit aperiam error earum accusantium sunt.
      </p>
      <p className="text-sm text-gray-500 mt-2">Joined on January 1, 2024</p>
    </div>
  );
};

export default Profileheader;
