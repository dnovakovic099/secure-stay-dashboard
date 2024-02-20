import { PlusIcon } from "@heroicons/react/20/solid";
import React from "react";

const Policies = () => {

    function addAdditinoalInfo() {
        return (
          <div className="flex items-center mt-2">
              <PlusIcon
              className="h-4 w-4 mr-3 text-indigo-600 hover:text-indigo-400 cursor-pointer"
              aria-hidden="true"
             
            />
            <p className=" text-indigo-600 hover:text-indigo-400 cursor-pointer">
              {" "}
              Add Additinoal Information
            </p>
          
          </div>
        );
      }
  return (
    <>
      <div className="w-full mt-2">
        <div className="text-sm font-medium text-gray-500">Description</div>
        <p className="mt-1">
          Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
          enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
          praesent donec est. Odio penatibus risus viverra tellus varius sit
          neque erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim
          sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis
          id.
        </p>
        <div className="mt-2 text-sm font-medium text-gray-500">
          Short description(optional)
        </div>

        <p className="mt-1">
          Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio
          id et. Id blandit molestie auctor fermentum dignissim. Lacus diam
          tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac
          adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel
          integer orci.
        </p>
        <div className="flex justify-between w-64 mt-2">
          <div>
            <div className="flex justify-between w-64 text-gray-400">
              Check-in Direction(optional)
            </div>
            <div>None</div>
          </div>
          <div>
            <div className="flex justify-between w-64 ml-5 text-gray-400">
              Check-out Direction(optional)
            </div>
            <div className="ml-5">None</div>
          </div>
        </div>
        {addAdditinoalInfo()}
      </div>
    </>
  );
};

export default Policies;
