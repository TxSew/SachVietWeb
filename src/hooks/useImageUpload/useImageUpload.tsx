import { useState, ChangeEvent } from "react";

const useImageUpload = () => {
  const [image, setImage] = useState<string | null>(null);
  const [img, setImg] = useState<any>({});

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImg(event.target.files);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return { image, handleImageChange, img };
};

export default useImageUpload;
