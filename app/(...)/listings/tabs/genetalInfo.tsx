import React from 'react';

const GeneralInfo = ({ selectedItem }: any) => {
  const hotelInfo = [
    { fieldName: 'Nick Name', fieldValue: 'Triple S Retreat', id: 1 },
    { fieldName: 'Name', fieldValue: 'Sunset Splendor', id: 2 },
    { fieldName: 'Property Type', fieldValue: 'Apartment', id: 3 },
    { fieldName: 'Currency', fieldValue: 'USD', id: 4 },
    { fieldName: 'Wifi', fieldValue: 'USD', id: 6 },
    { fieldName: 'Occupancy', fieldValue: 'USD', id: 7 },
  ];

  return (
    <div className="mt-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {hotelInfo.map((item) => (
          <li
            key={item.id}
            className="bg-white overflow-hidden border-b border-gray-200"
          >
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                {item.fieldName}
              </h3>
              {item.fieldName.toLowerCase() === 'wifi' ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Wifi Network:</span>
                    <span>Triple S Retreat</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Wifi Password:</span>
                    <span>Welcome_123</span>
                  </div>
                </div>
              ) : (
                <span className="text-sm text-gray-600">{item.fieldValue}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GeneralInfo;
