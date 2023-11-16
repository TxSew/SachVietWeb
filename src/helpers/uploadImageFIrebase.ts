import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../configs/fireBaseConfig";

export const uploadImageFirebase = async (images: any) => {
  for (let i = 0; i < images.length; i++) {
    const imageRef = ref(storage, `multipleFiles/${images[i].name}`);
    const data = await uploadBytes(imageRef, images[i]).then(() => {
      return storage
        .ref("multipleFiles")
        .child(images[i].name)
        .getDownloadURL()
        .then((url: any) => {
          return url;
        });
    });
    return data;
  }
};
