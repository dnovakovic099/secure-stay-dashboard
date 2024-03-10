import { envConfig } from "@/utility/environment";
import React from "react";

interface CardProps {
  image: string | null;
  title: string;
  description: string;
}

export const Card: React.FC<CardProps> = ({ image, title }) => {
  return (
    <div className="w-24 items-center text-xs mb-1">
      <img
        className="w-24 h-[120px] object-cover rounded-lg cursor-pointer"
        src={`${envConfig.backendUrl}/${image}` || ""}
        alt={title}
      />
      <div className="pl-1 pt-2">
        <h3 className="text-xs font-semibold text-gray-800 justify-start">
          {title}
        </h3>
      </div>
    </div>
  );
};
