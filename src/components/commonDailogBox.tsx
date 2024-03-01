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
    <div className={`fixed inset-0 ${isOpen ? "flex" : "hidden"} items-center justify-center bg-black bg-opacity-50 z-40`}>
      <div ref={dialogRef} className="bg-white w-full max-w-md p-6 rounded-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">{message}</h2>
        <div className="flex justify-center space-x-4 mt-5">
          <button
            className="bg-blue-500 text-white px-4 py-1.5 rounded-full hover:bg-blue-600 transition focus:outline-none"
            onClick={() => {
              onYes();
              onClose();
            }}
          >
            Confirm
          </button>
          <button
            className="bg-red-500 text-white px-4 py-1.5 rounded-full hover:bg-gray-600 transition focus:outline-none"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommonDialog;
