import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black-100">
      <div className="w-8 h-8 border-r-4 border-solid border-black rounded-full animate-spin"></div>
    </div>
  );
};


export default Loader;
