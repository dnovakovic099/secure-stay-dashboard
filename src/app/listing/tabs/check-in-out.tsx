import React from 'react'

const CheckInandOut = () => {
  return (
    <div className='flex mt-4 w-full'>
      {/* Check In/out Time */}
      <div className="flex flex-col col-span-2 md:col-span-1 w-full  gap-4">
        <div className="text-lg font-semibold mb-2">Check-in & checkout times</div>
        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-gray-600">Check-in time</div>
            <div className="text-gray-900">03:00 PM</div>
          </div>
          <div>
            <div className="text-gray-600">Checkout time</div>
            <div className="text-gray-900">11:00 AM</div>
          </div>
        </div>
        {/* Row 2 */}
        <div className="mb-4">
          <div className='flex flex-row justify-between '>
            <div className="text-gray-600 ">Check-in information</div>
            <button className="bg-slate-400 rounded-full text-gray-900 px-3 py-1 hover:bg-slate-500">
              Add steps
            </button>
          </div>
          <div className="flex bg-gray-200 p-1 mt-2 text-gray-600 justify-center rounded-md">
            No setps
          </div>
        </div>
        {/* Row 3 */}
        <div className="mb-4">
          <div className='flex flex-row justify-between '>
            <div className="text-gray-600 ">Checkout information</div>
            <button className="bg-slate-400 rounded-full text-gray-900 px-3 py-1 hover:bg-slate-500">
              Add steps
            </button>
          </div>
          <div className="flex bg-gray-200 p-1 mt-2 text-gray-600 justify-center rounded-md">
            No setps
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckInandOut
