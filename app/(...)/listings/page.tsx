'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  EllipsisVerticalIcon,
  BarsArrowDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/20/solid';
import { SlArrowRight } from 'react-icons/sl';
import { SlArrowLeft } from 'react-icons/sl';
import HotelDetail from './HotelDetail';
import axios, { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import { envConfig } from '@/utility/environment';
import handleApiCallFetch from '@/components/handleApiCallFetch';

const projects = [
  {
    id: 1,
    name: 'Sun Set Hotel & villas',
    address: '2/123 Sunset Street,Paradise,Ice Land',
    nickName: 'Triple S Retreat',
    bgColor: 'bg-pink-600',
    imageUrl:
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: 'Royal Oasis Hotel',

    address: '2/123 Royal Street,Paradise,Nobia City',
    nickName: 'Royal Oasis',
    bgColor: 'bg-purple-600',
    imageUrl:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    name: 'Emerald Resort',
    address: '2/123 Emerald  Street,Paradise,Nobia City',
    nickName: 'Emerald Resort',
    bgColor: 'bg-yellow-500',
    imageUrl:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    name: 'Modern Villas',
    address: '2/123 Modern Street,Paradise,New York',
    nickName: 'Modern Villas special',

    bgColor: 'bg-green-500',
    imageUrl:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    name: 'Sun Set Hotel & villas',
    address: '2/123 Sunset Street,Paradise,Ice Land',
    nickName: 'Sun Set Hotel',

    bgColor: 'bg-pink-600',
    imageUrl:
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    name: 'Royal Oasis Hotel',
    nickName: 'Royal Oasis',

    address: '2/123 Royal Street,Paradise,Nobia City',

    bgColor: 'bg-purple-600',
    imageUrl:
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 7,
    name: 'Emerald Resort',
    address: '2/123 Emerald  Street,Paradise,Nobia City',
    nickName: 'Emerald',

    bgColor: 'bg-yellow-500',
    imageUrl:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 8,
    name: 'Modern Villas',
    address: '2/123 Modern Street,Paradise,New York',
    nickName: 'Modern',

    bgColor: 'bg-green-500',
    imageUrl:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

function Listing() {
  const [showAll, setShowAll] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  const [listdata, setListdata] = useState<any[]>([]);

  const getHostawayListFromDb = async () => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    var params = { method: 'GET', headers: headers };
    try {
      const apiUrl = `${envConfig.backendUrl}/listing/getlistings`;
      const response: any = await handleApiCallFetch(apiUrl, params);
      console.log('response', response);
      if (response && response.success) {
        console.log('response getlistings:', response.listings);
        formattResponse(response.listings);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formattResponse = (AllData: any) => {
    const formattedData = AllData.map((data: any) => ({
      id: data && data.id ? data.id : '',
      name: data.name ? data.name : '',
      address: data && data.address ? data.address : '',
      nickName: data.name ? data.name : '',
      bgColor: 'bg-pink-600',
      imageUrl:
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      // imageUrl: data && data.images && data.images[0] && data.images[0].url ? data.images[0].url : '',
    }));
    setListdata(formattedData);
  };

  const syncHostawayListings = async () => {
    try {
      const apiUrl = `${envConfig.backendUrl}/listing/synchostawaylistings`;
      const axiosPromise: Promise<AxiosResponse<any>> = axios.get(apiUrl);
      const responsePromise: Promise<any> = axiosPromise.then(
        (response) => response.data,
      );
      toast.promise(responsePromise, {
        loading: 'Syncing listings with hostaway listing Please wait!',
        success: 'Listing synced successfully!',
        error: 'Something went wrong!',
      });

      return;
    } catch (error) {
      console.log(error, 'Error-checking');
      console.log(error);
    }
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  useEffect(() => {
    getHostawayListFromDb();
  }, []);

  return (
    <>
      <div className="m-6 relative rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-[600] text-gray-900">All Listings</h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-flow-col-3 lg:grid-cols-4 min-w-[200px] relative">
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 z-10 bg-white p-1.5 rounded-full shadow-md hover:shadow-lg cursor-pointer">
            <SlArrowLeft className="w-5 h-5 text-gray-900" />
          </div>
          {visibleProjects?.map((project: any) => (
            <div
              key={project.id}
              onClick={() => setSelectedItem(project)}
              className={`relative flex rounded-md shadow-md p-1.5 bg-white transition duration-300 transform cursor-pointer ${
                selectedItem === project
                  ? 'ring-2 ring-blue-500'
                  : 'hover:ring-2 hover:ring-blue-500'
              }`}
            >
              <div className="w-1/3 h-24  ">
                <Image
                  className="object-cover w-full h-full rounded-md"
                  src={project.imageUrl}
                  alt="hotel"
                  width={500}
                  height={500}
                />
              </div>
              <div className="flex-1 p-2">
                <p className="font-semibold text-base text-gray-900 hover:text-indigo-600 mb-1 line-clamp-1">
                  {project.name}
                </p>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {project.address}
                </p>
              </div>
            </div>
          ))}
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 z-10 bg-white p-1.5 rounded-full shadow-md hover:shadow-lg cursor-pointer">
            <SlArrowRight className="w-5 h-5 text-gray-900" />
          </div>
        </div>
      </div>

      {selectedItem && <HotelDetail selectedItem={selectedItem} />}
    </>
  );
}

export default Listing;
