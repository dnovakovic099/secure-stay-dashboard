const CheckInandOut = ({ selectedItem }: any) => {
  console.log(selectedItem);
  return (
    <div className="mt-6">
      <div className="text-lg font-semibold mb-4 text-gray-900">
        Check-in & Checkout Times
      </div>
      <div className="bg-white py-6">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <div className="text-gray-600">Check-in time</div>
            <div className="text-gray-800 font-semibold">{`${
              selectedItem?.checkInTimeStart
            }:00 ${selectedItem?.checkInTimeStart > 12 ? 'PM' : 'AM'}`}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-gray-600">Checkout time</div>
            <div className="text-gray-800 font-semibold">{`${
              selectedItem?.checkOutTime
            }:00 ${selectedItem?.checkOutTime > 12 ? 'PM' : 'AM'}`}</div>
          </div>
        </div>
        <div className="flex flex-col space-y-4 my-4">
          <div className="flex items-center justify-between ">
            <div className="text-gray-600">Check-in information</div>
            <button className="rounded-full px-4 py-2 border border-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400">
              Add Steps
            </button>
          </div>
          <div className="flex bg-gray-200 p-2 text-gray-800 justify-center rounded-md">
            No steps added
          </div>
        </div>
        <div className="flex flex-col space-y-4 my-4">
          <div className="flex items-center justify-between ">
            <div className="text-gray-600">Checkout information</div>
            <button className="rounded-full px-4 py-2 border border-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400">
              Add Steps
            </button>
          </div>
          <div className="flex bg-gray-200 p-2 text-gray-800 justify-center rounded-md">
            No steps added
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInandOut;
