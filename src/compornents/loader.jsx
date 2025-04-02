import React from "react";
import loader from "../assets/loader.gif";

export default function Loader() {
  return (
    <div className="flex justify-start m-5">
      <img src={loader} alt="loader" className="w-20 h-20" />
    </div>
  );
}
