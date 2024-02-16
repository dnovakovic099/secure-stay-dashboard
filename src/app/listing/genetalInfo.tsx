import React from 'react'

const GenetalInfo = ({selectedItem}:any) => {

    const hotelInfo = [
        { fieldName: "Nick Name", fieldValue: "Triple S Retreat", id: 1 },
        { fieldName: "Name", fieldValue: "sunset Splender", id: 2 },
      
        { fieldName: "Property Type", fieldValue: "Appartment", id: 3 },
        { fieldName: "Currency", fieldValue: "USD", id: 4 },
        { fieldName: "wifi", fieldValue: "USD", id: 6 },
        { fieldName: "occupancy", fieldValue: "USD", id: 7 },
      ];
  return (
    <div className='mt-2'>
      <ul
        role="list"
        className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-2"
      >
        {hotelInfo?.map((person) => (
        
            <li key={person.id} className=" ">
              <div className="flex w-full items-center justify-between space-x-4 py-2">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-1">
                    <h3 className="truncate text-sm font-medium text-gray-900">
                      {person?.fieldName?.toUpperCase()}
                    </h3>
                  </div>
                  {person?.fieldName.toLowerCase() === "wifi" ? (
                    <>
                      <div className="flex justify-between w-24">
                        <div>
                          <div className="flex justify-between w-24 text-gray-400">
                            Wifi network
                          </div>
                          <div>Triple S Retreat</div>
                        </div>
                        <div>
                          <div className="flex justify-between w-24 ml-5 text-gray-400">
                            Wifi password
                          </div>
                          <div className="ml-5">Welcome_123</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <span className="truncate text-sm font-medium text-gray-500">
                      {selectedItem?.name}
                    </span>
                  )}
                </div>
              </div>
            </li>
        
        ))}
      </ul>
    </div>
  )
}

export default GenetalInfo
