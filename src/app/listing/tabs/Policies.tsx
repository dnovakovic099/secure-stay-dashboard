import { PlusIcon } from '@heroicons/react/20/solid';

const Policies = () => {
  return (
    <div className="flex flex-col w-full mt-2">
      {/* Description Section */}
      <div className="text-sm font-medium text-gray-700 mb-2">Description</div>
      <p className="text-sm text-gray-600">
        Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim.
        Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent
        donec est. Odio penatibus risus viverra tellus varius sit neque erat
        velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget
        risus enim. Mattis mauris semper sed amet vitae sed turpis id.
      </p>

      {/* Short Description Section */}
      <div className="text-sm font-medium text-gray-700 mt-4 mb-2">
        Short description (optional)
      </div>
      <p className="text-sm text-gray-600">
        Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id
        et. Id blandit molestie auctor fermentum dignissim. Lacus diam tincidunt
        ac cursus in vel. Mauris varius vulputate et ultrices hac adipiscing
        egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.
      </p>

      {/* Check-in and Check-out Directions */}
      <div className="flex justify-between w-full mt-4">
        <div>
          <div className="text-sm font-medium text-gray-700 mb-1">
            Check-in Direction (optional)
          </div>
          <p className="text-lg font-semibold text-gray-800">None</p>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-700 mb-1">
            Check-out Direction (optional)
          </div>
          <p className="text-lg font-semibold text-gray-800">None</p>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="flex items-center mt-4">
        <PlusIcon className="h-4 w-4 mr-2 text-indigo-600" />
        <p className="text-sm text-indigo-600 hover:text-indigo-700 cursor-pointer">
          Add Additional Information
        </p>
      </div>
    </div>
  );
};

export default Policies;
