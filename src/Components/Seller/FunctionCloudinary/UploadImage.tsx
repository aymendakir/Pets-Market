export const UploadImage = (file:File, folder:string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
        "upload_preset",
        import.meta.env.VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append(
        "cloud_name",
        import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME
    );
    formData.append("folder", folder);

    return fetch(
        `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
            method: "POST",
            body: formData,
        }
    )
        .then((resp) => resp.json())
        .then((data) => {
            return data;
        });
};
