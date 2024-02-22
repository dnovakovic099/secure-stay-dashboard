import React from 'react'

const GeneralInfo = ({ selectedItem }: any) => {

  return (
    <div className='mt-6'>
      <ul role="list" className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-2 gap-5" >
        <div className="flex w-full items-center justify-between space-x-4 ">
          <div className="flex-1 truncate  pr-10" >
            <div className="flex items-center space-x-1 pb-1">
              <h3 className="truncate text-sm font-medium text-gray-500">
                Nick Name
              </h3>
            </div>
            <span className="truncate text-sm font-medium text-gray-900 ">
              {selectedItem?.internalListingName}
            </span>
          </div>
        </div>

        <div className="flex w-full items-center justify-between space-x-4 py-2">
          <div className="flex-1 truncate  pr-10">
            <div className="flex items-center space-x-1 pb-1">
              <h3 className="truncate text-sm font-medium text-gray-500">
                Name
              </h3>
            </div>
            <span className="truncate text-sm font-medium text-gray-900">
              {selectedItem?.name}
            </span>
          </div>
        </div>

        <div className="flex w-full items-center justify-between space-x-4 py-2">
          <div className="flex-1 truncate  pr-10">
            <div className="flex items-center space-x-1 pb-1">
              <h3 className="truncate text-sm font-medium text-gray-500">
                Property Type
              </h3>
            </div>
            <span className="truncate text-sm font-medium text-gray-900">
              {selectedItem?.bookingcomPropertyRoomName}
            </span>
          </div>
        </div>

        <div className="flex w-full items-center justify-between space-x-4 py-2">
          <div className="flex-1 truncate  pr-10">
            <div className="flex items-center space-x-1 pb-1">
              <h3 className="truncate text-sm font-medium text-gray-500">
                Currency
              </h3>
            </div>
            <span className="truncate text-sm font-medium text-gray-900">
              {selectedItem?.currencyCode}
            </span>
          </div>
        </div>

        <div className="flex w-full items-center justify-between space-x-4 py-2">
          <div className="flex-1 truncate  pr-10 ">
            <div className="flex items-center space-x-1 pb-1">
              <h3 className="truncate text-lg font-semibold text-gray-00">
                wifi
              </h3>
            </div>
            <div className="flex gap-12">
              <div>
                <h3 className="truncate text-sm font-medium text-gray-500">
                  wifi Network
                </h3>
                <span className="truncate text-sm font-medium text-gray-900">
                  {selectedItem?.wifiUsername}
                </span>
              </div>
              <div>
                <h3 className="truncate text-sm font-medium text-gray-500">
                  Wifi password
                </h3>
                <span className="truncate text-sm font-medium text-gray-900">
                  {selectedItem?.wifiPassword}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-between space-x-4 py-2">
          <div className="flex-1 truncate pr-10">
            <div className="flex items-center space-x-1 pb-1">
              <h3 className="truncate text-lg font-semibold text-gray-900">
                Occupancy
              </h3>
            </div>
            <div className="flex">
              <div>
                <h3 className="truncate text-sm font-medium text-gray-500">
                  Guest
                </h3>
                <span className="truncate text-sm font-medium text-gray-900">
                  {selectedItem?.guestsIncluded}
                </span>
              </div>
            </div>
          </div>
        </div>

      </ul>
    </div>
  )
}

export default GeneralInfo;
