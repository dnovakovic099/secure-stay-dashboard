import Image from 'next/image'
import React from 'react'

const Picture = ({ selectedItem }: any) => {

  return (
    <div className='mt-4'>
      <div className="flex flex-col overflow-y-auto h-96">
        {/* Row 1: Main Image */}
        <div className="text-base font-semibold px-2">Main image</div>
        <div className="w-full p-2">
          <Image
            src={selectedItem?.images[0]?.url}
            alt="Main images"
            className="object-cover object-center w-full h-64 rounded-md"
            width={400}
            height={400}
          />
        </div>

        {/* Row 2: Additional Images */}
        <div className="text-base font-semibold px-2 pt-3">Additional images</div>
        <div className="text-sm px-2">Uploaded pictures: {selectedItem?.images?.length}</div>
        <div className="grid grid-cols-3 w-full ">
          {selectedItem?.images.map((imageUrl: any, index: any) => (
            <div key={imageUrl.id} className="w-full p-2">
              <img
                src={imageUrl.url}
                alt={`Image ${index + 1}`}
                className="w-full h-auto rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Picture
