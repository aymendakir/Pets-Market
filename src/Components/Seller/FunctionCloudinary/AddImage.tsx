import React, { useState } from 'react';
import {Trash} from "lucide-react";
interface ImageUploaderProps {
    onImageChange: (imageData: File|null,Name:string|null) => void;
}
export const ImageUploader: React.FC<ImageUploaderProps> = ({onImageChange}) => {
    const [dataImage, setDataImage] = useState<string | ArrayBuffer | null>("");
    const [ActiveImage, setActiveImage] = useState<boolean>(false)
    const [Name, setName] = useState("")
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();

            reader.onload = () => {
                setDataImage(reader.result);

            };

            reader.readAsDataURL(file);
            onImageChange(file,file.name);
            setActiveImage(true)
setName(file.name);
            event.target.value = "";
        }
    };
    const handleResetClick = () => {
     setDataImage(null)
        onImageChange(null,Name)
        setActiveImage(false)
    };
    return (
        <div className={"absolute w-full h-full  "}>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute w-full h-full cursor-pointer opacity-0"
                disabled={ActiveImage}
            />
            {dataImage && <><img src={dataImage.toString()} alt="Uploaded" className={"w-full h-full rounded-lg"} />
          <span className={"absolute right-0 top-0 p-1 bg-red-500 rounded-bl-lg cursor-pointer"} onClick={handleResetClick}><Trash /></span>  </>}
        </div>
    );
};
