import React from "react";

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
}

export const Card: React.FC<CardProps> = ({ imageUrl, title, description }) => {
  return (
    <div className="w-[126px] items-center text-xs mb-2">
      <img
        className="w-[126px] h-40 object-cover rounded-lg"
        src={imageUrl}
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
