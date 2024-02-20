import React from 'react'

const Address = ({ selectedItem }: any) => {
   const [streetAddress, city, state, zipCode] = selectedItem?.address.split(', ');
  return (
    <div className='flex mt-4 text-gray-900 w-full'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 w-full">
        {/* Row 1 */}
        <div className="flex flex-col">
          <div className=" text-gray-600">Street</div>
          <div className="text-gray-900">{streetAddress}</div>
        </div>
        <div className="flex flex-col">
          <div className=" text-gray-600">Apartment</div>
          <div className="text-gray-900">Apt 4B</div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col">
          <div className=" text-gray-600">City</div>
          <div className="text-gray-900">{city}</div>
        </div>
        <div className="flex flex-col">
          <div className=" text-gray-600">Region</div>
          <div className="text-gray-900">Example Region</div>
        </div>

        {/* Row 3 */}
        <div className="flex flex-col">
          <div className=" text-gray-600">Country</div>
          <div className="text-gray-900">Example Country</div>
        </div>
        <div className="flex flex-col">
          <div className=" text-gray-600">Zip</div>
          <div className="text-gray-900">12345</div>
        </div>

        {/* Row 4 */}
        <div className="flex flex-col">
          <div className=" text-gray-600">Latitude</div>
          <div className="text-gray-900">40.7128° N</div>
        </div>
        <div className="flex flex-col">
          <div className=" text-gray-600">Longitude</div>
          <div className="text-gray-900">74.0060° W</div>
        </div>
      </div>
    </div>
  )
}

export default Address
