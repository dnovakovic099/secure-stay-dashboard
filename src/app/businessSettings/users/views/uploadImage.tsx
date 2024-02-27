'user client';
import React from 'react';
import { UserIcon } from '@heroicons/react/20/solid';

interface UploadImageProps {
    imageUrl: any,
    setImageUrl: any;
}

const UploadImage = ({ imageUrl, setImageUrl }: UploadImageProps) => {

    const handleImageUpload = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader: any = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='col-span-4'>
            <div className='mt-8 flex justify-end'>
                <label className="upload-label">
                    <input type="file" id="imageUpload" className="hidden" onChange={handleImageUpload} />
                    <div className='text-center h-52 w-52 border-2 rounded-md'>
                        {imageUrl ? (
                            <img
                                src={imageUrl} className='h-full w-full object-cover rounded-md'
                            />
                        ) : (
                            <UserIcon color='white' className='bg-indigo-500 rounded-md' />
                        )}
                    </div>
                </label>
            </div>
        </div>
    );
};

export default UploadImage;