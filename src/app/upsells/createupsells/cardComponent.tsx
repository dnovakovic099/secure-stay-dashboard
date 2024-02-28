import React from "react";

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
}

export const Card: React.FC<CardProps> = ({ imageUrl, title, description }) => {
  return (
    <div className="w-28 items-center text-xs">
      <img
        className="w-28 h-36 object-cover rounded-2xl"
        src={imageUrl}
        alt={title}
      />
      <div className="p-4">
        <h3 className="text-xs font-semibold text-gray-800 justify-start">
          {title}
        </h3>
      </div>
    </div>
  );
};

