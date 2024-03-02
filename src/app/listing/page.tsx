"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { envConfig } from "@/utility/environment";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import classNames from "classnames";
import SideBarMain from "@/components/sidebar";
import SearchBar from "@/components/searchbar";

import Box from "./Box";
import HotelDetail from "./HotelDetail";

const MainListings = () => {
  const [sliceNum, setSliceNum] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${envConfig.backendUrl}/listing/getlistings`,
          {
            cache: "no-cache",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setListings(data.listings);
        setIsLoading(false);
        if (data.listings && data.listings.length > 0) {
          setSelectedItem(data.listings[0]);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRightSide = (val: any) => {
    setSliceNum((num) => num + val);
  };

  const handleItemClick = (project: any) => {
    setSelectedItem(project);
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 overflow-hidden bg-slate-100">
        <main className="flex-1 overflow-y-auto">
          <SearchBar />
          <Toaster />
          <div className="m-6 relative rounded-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              All Listings
            </h2>
            {isLoading ? (
              <div className="flex items-center justify-center h-[70vh]">
                <div className="w-12 h-12 border-4 border-blue-500 border-r-gray-100 rounded-full animate-spin"></div>
              </div>
            ) : (
              selectedItem && (
                <div className="relative">
                  <div
                    className={classNames(
                      "absolute top-1/2 -left-4 transform -translate-y-1/2 z-10 bg-white p-1.5 rounded-full shadow-md hover:shadow-lg cursor-pointer",
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
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {listings
                      ?.slice(sliceNum, sliceNum + 4)
                      .map((project: any) => (
                        <Box
                          key={project.id}
                          project={project}
                          selectedItem={selectedItem}
                          handleItemClick={handleItemClick}
                        />
                      ))}
                  </div>
                  <div
                    className={classNames(
                      "absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 bg-white p-1.5 rounded-full shadow-md hover:shadow-lg cursor-pointer transition-transform duration-300",
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
          {selectedItem && <HotelDetail selectedItem={selectedItem} />}
        </main>
      </div>
    </div>
  );
};

export default MainListings;
