import React, { useRef, useEffect } from "react";

interface CommonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onYes: () => void;
  message: string;
}

export const CommonDialog: React.FC<CommonDialogProps> = ({
  isOpen,
  onClose,
  onYes,
  message,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center bg-gray-900 bg-opacity-75 z-40`}
    >
      <div ref={dialogRef} className="bg-white w-full max-w-md p-6 rounded-md shadow-lg">
        <h2 className="text-md items-center font-bold mb-4 text-gray-800"> {message} </h2>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-green-500 text-white px-6 py-1 rounded-full hover:bg-green-600 transition focus:outline-none"
            onClick={() => {
              onYes();
              onClose();
            }}
          >
            Yes
          </button>
          <button
            className="bg-red-500 text-white px-6 py-1 rounded-full hover:bg-red-600 transition focus:outline-none"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommonDialog;
