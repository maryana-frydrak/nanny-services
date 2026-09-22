import React from "react";
import { PacmanLoader } from "react-spinners";
import "./Loader.css";

export const Loader: React.FC = () => {
  return (
    <div className="loader-backdrop">
      <PacmanLoader color="#f03f3b" size={25} />
    </div>
  );
};
