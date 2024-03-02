import Image from 'next/image';

const Box = ({ project, selectedItem, handleItemClick }: any) => {
  return (
    <div
      key={project.id}
      onClick={() => handleItemClick(project)}
      className={`flex items-start gap-2 rounded-md shadow-md p-2 bg-white transition duration-300 transform cursor-pointer ${
        selectedItem === project
          ? 'ring-2 ring-purple-500'
          : 'hover:ring-2 hover:ring-purple-500'
      }`}
    >
      <div className="flex">
        <Image
          className="object-cover h-24 rounded-md"
          src={project.images[0].url}
          alt="hotel"
          width={100}
          height={100}
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
            ? 'absolute inset-0 bg-gradient-to-bl from-dark to-white opacity-20 rounded-lg'
            : ''
        }
      />
    </div>
  );
};

export default Box;
