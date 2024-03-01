import React from 'react'

const Address = ({ selectedItem }: any) => {

  return (
    <div className='flex mt-4 text-gray-900 w-full'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 w-full">
        {/* Row 1 */}
        <div className="flex flex-col">
          <div className=" text-gray-600">Street</div>
          <div className="text-gray-900">{selectedItem?.street}</div>
        </div>
        <div className="flex flex-col">
          <div className=" text-gray-600">City</div>
          <div className="text-gray-900">{selectedItem?.city}</div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col">
          <div className=" text-gray-600">State</div>
          <div className="text-gray-900">{selectedItem?.state}</div>
        </div>
        <div className="flex flex-col">
          <div className=" text-gray-600">Country</div>
          <div className="text-gray-900">{selectedItem?.country}</div>
        </div>

        {/* Row 3 */}
        <div className="flex flex-col">
          <div className=" text-gray-600">CountryCode</div>
          <div className="text-gray-900">{selectedItem?.countryCode}</div>
        </div>
        <div className="flex flex-col">
          <div className=" text-gray-600">ZipCode</div>
          <div className="text-gray-900">{selectedItem?.zipcode}</div>
        </div>

        {/* Row 4 */}
        <div className="flex flex-col">
          <div className=" text-gray-600">Latitude</div>
          <div className="text-gray-900">{selectedItem?.lat}</div>
        </div>
        <div className="flex flex-col">
          <div className=" text-gray-600">Longitude</div>
          <div className="text-gray-900">{selectedItem?.lng}</div>
        </div>
      </div>
    </div>
  )
}

export default Address
