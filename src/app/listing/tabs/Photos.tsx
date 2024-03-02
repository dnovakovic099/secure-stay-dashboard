import Image from 'next/image';

const Photos = ({ selectedItem }: any) => {
  return (
    <div className="grid grid-cols-3 gap-2 h-[400px] overflow-y-auto">
      {selectedItem.images.map((image: any) => (
        <div key={image.id} className="w-full">
          <Image
            src={image?.url}
            alt="Hotel Image"
            width={300}
            height={200}
            className="rounded-md object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default Photos;
