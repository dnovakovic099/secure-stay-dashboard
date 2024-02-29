/* eslint-disable @next/next/no-img-element */
"use client";
import { Sidebar } from "../../components/sidebar";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { envConfig } from "../../utility/environment";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import classNames from "classnames";
import HotelDetail from "./HotelDetail";
const MainMessageScreen = () => {
  const [sliceNum, setSliceNum] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${envConfig.backendUrl}/listing/getlistings`;
        const response = await axios.get(apiUrl); // Fetch data
        const data = response.data;
        setListings(data.listings);
        setIsLoading(false); // Set loading state to false after fetching data

        if (data.listings && data.listings.length > 0) {
          setSelectedItem(data.listings[0]);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false); // Set loading state to false in case of error
      }
    };

    fetchData();
  }, []);

  // const syncHostawayListings = async () => {
  //   try {
  //     const apiUrl = `${envConfig.backendUrl}/listing/synchostawaylistings`;
  //     const response = await axios.get(apiUrl);
  //     const data = response.data;
  //     setListings(data.listings);
  //   } catch (error) {
  //     console.log(error, 'Error-checking');
  //     console.log(error);
  //   }
  // };

  const handleRightSide = (val: any) => {
    setSliceNum((num) => num + val);
  };

  const handleItemClick = (project: any) => {
    setSelectedItem(project);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 h-screen overflow-hidden bg-slate-100">
        <SearchBar />
        <main className="overflow-y-auto">
          <div className="m-6 relative rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                All Listings
              </h2>
            </div>
            {isLoading ? (
              <div className="flex items-center justify-center h-[70vh]">
                <div className="w-12 h-12 border-4 border-blue-500 border-r-gray-100 rounded-full animate-spin"></div>
              </div>
            ) : (
              selectedItem && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-flow-col-3 lg:grid-cols-4 min-w-[200px] relative ">
                  {/* Left arrow button */}
                  <div
                    className={classNames(
                      "absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 z-10 bg-white p-1.5 rounded-full shadow-md hover:shadow-lg cursor-pointer",
                      { hidden: sliceNum <= 0 }
                    )}
                  >
                    <SlArrowLeft
                      className="w-5 h-5 text-gray-900"
                      onClick={() => {
                        if (sliceNum <= 0) return;
                        handleRightSide(-1);
                      }}
                    />
                  </div>
                  {/* Listing items */}
                  {listings
                    ?.slice(sliceNum, sliceNum + 4)
                    .map((project: any) => (
                      <div
                        key={project.id}
                        onClick={() => handleItemClick(project)}
                        className={`flex rounded-md shadow-md p-2 bg-white transition duration-300 transform cursor-pointer ${
                          selectedItem === project
                            ? "ring-2 ring-purple-500"
                            : "hover:ring-2 hover:ring-purple-500"
                        }`}
                      >
                        <div className="flex-1">
                          <img
                            className="object-cover h-24 rounded-md"
                            src={project.images[0].url}
                            alt="hotel"
                          />
                        </div>
                        <div className="flex-1 px-2 py-1">
                          <p className="font-semibold text-lg text-gray-900 hover:text-indigo-600 mb-1 line-clamp-1">
                            {project.name}
                          </p>
                          <p className="text-gray-600 text-sm font-normal line-clamp-2">
                            {project.address}
                          </p>
                        </div>
                        <div
                          className={
                            selectedItem === project
                              ? "absolute inset-0 bg-gradient-to-bl from-dark to-white opacity-20 rounded-lg"
                              : ""
                          }
                        />
                      </div>
                    ))}
                  {/* Right arrow button */}
                  <div
                    className={classNames(
                      "absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 z-10 bg-white p-1.5 rounded-full shadow-md hover:shadow-lg cursor-pointer transition-transform duration-300",
                      { hidden: sliceNum >= listings?.length - 4 }
                    )}
                  >
                    <SlArrowRight
                      className="w-5 h-5 text-gray-900"
                      onClick={() => {
                        if (sliceNum >= listings.length - 4) return;
                        handleRightSide(1);
                      }}
                    />
                  </div>
                </div>
              )
            )}
          </div>

          {/* Display the details of the selected item */}
          {selectedItem && <HotelDetail selectedItem={selectedItem} />}
        </main>
      </div>
    </div>
  );
};
export default MainMessageScreen;
