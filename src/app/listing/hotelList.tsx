import React, { useState } from 'react';
import Image from "next/image";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function HotelListing({ projects, setSelectedItem, selectedItem }: any) {
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
        ) : (
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
        {visibleProjects?.map((project: any) => (

          <li key={project.id} className="col-span-1 flex rounded-md shadow-sm h-32">
            <div onClick={() => setSelectedItem(project)}
              className={classNames(
                project.id == selectedItem?.id ? "border-blue-500 bg-slate-100" : "border-gray-200 bg-white",
                "flex flex-1 items-start justify-between truncate rounded-md border-2"
              )}>

              <Image
                className="flex w-32 h-32 p-2 rounded-xl flex-shrink-0 items-center justify-center text-sm font-medium text-white object-cover"
                src={project.imageUrl}
                alt="hotel"
                width={500}
                height={500}
              />

              <div className="flex-1 truncate px-2 py-4 text-sm">
                <div className="font-medium text-gray-900 truncate pb-2 text-base">{project.name}</div>
                <p className="text-gray-500 whitespace-normal text-sm">{project.address}</p>
              </div>
            </div>
          </li>

        ))}
      </ul>

    </div>
  );
}

export default HotelListing;
