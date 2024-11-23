import { Image } from 'cloudinary-react';

type ImageProps={
    images:[{name:string}]
}
function Images({images}:ImageProps) {
  return (
    <main className="w-[60%] ml-20 h-full">
      <div className="grid grid-cols-2 gap-7">
          {images?.map(image => (
              <Image cloudName={import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME} publicId={image.name}  className="border border-gray-200 w-full h-[300px] rounded-lg bg-gray-100"></Image>


          ))}

      </div>
    </main>
  );
}

export default Images;
