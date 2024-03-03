import Image from "next/image";

const Box = ({ project, selectedItem, handleItemClick }: any) => {
  return (
    <div
      key={project.id}
      onClick={() => handleItemClick(project)}
      className={`flex gap-4 justify-between py-1.5 pr-4 pl-1.5 rounded-lg bg-white cursor-pointer transition duration-300 transform shadow-lg ${
        selectedItem === project
          ? "ring-2 ring-purple-500"
          : "hover:ring-2 hover:ring-purple-500"
      }`}
    >
      <Image
        className="object-cover h-24 rounded-md"
        src={project.images[0].url}
        alt="hotel"
        width={100}
        height={100}
      />
      <div className="flex flex-col flex-1 my-auto">
        <p className="font-semibold text-[1rem] text-gray-900 hover:text-indigo-600 mb-1 line-clamp-1">
          {project.name}
        </p>
        <p className="text-gray-600 text-xs font-normal line-clamp-2">
          {project.address}
        </p>
      </div>
      <div
        className={
          selectedItem === project
            ? "absolute inset-0 bg-gradient-to-bl from-indigo-500 to-white opacity-20 rounded-lg"
            : ""
        }
      />
    </div>
  );
};

export default Box;
