import React, { useState } from 'react';
import Image from "next/image";


function HotelListing({ projects ,setSelectedItem}:any) {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div>
       <div className='flex justify-between'>
      <h2 className="text-sm mt-5 font-medium text-gray-900">All listings</h2>
      {!showAll ? (
        <button
          className="mt-3 w-20 text-sm text-blue-600 hover:underline"
          onClick={toggleShowAll}
        >
          See All
        </button>
      ):(
        <button
          className="mt-3 w-20 text-sm text-blue-600 hover:underline"
          onClick={toggleShowAll}
        >
          See Less
        </button>
      )
      }
      </div>
      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
      >
        {visibleProjects.map((project:any) => (
          <li key={project.name} className="col-span-1 flex rounded-md shadow-sm h-32">
            <div onClick={()=>setSelectedItem(project)} className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
             
                <Image
                  className="flex w-32 h-32 p-2 rounded-xl flex-shrink-0 items-center justify-center text-sm font-medium text-white object-cover"
                  src={project.imageUrl}
                  alt="hotel"
                  width={500}
                  height={500}
                />
           
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <div className="font-medium text-gray-900 hover:text-gray-600">{project.name}</div>
                <p className="text-gray-500 whitespace-normal w-40">{project.address}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
     
    </div>
  );
}

export default HotelListing;
