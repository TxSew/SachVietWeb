import { useState, ChangeEvent } from 'react';
import { pushError, pushWarning } from '../../components/Toast/Toast';

const useImageUpload = () => {
    const [image, setImage] = useState<string | null>(null);
    const [img, setImg] = useState<any>({});

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileName = file.name.toLowerCase();
            if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (typeof reader.result === 'string') {
                        setImage(reader.result);
                        setImg(event.target.files);
                    }
                };
                reader.readAsDataURL(file);
            } else {
                setImg('');
                setImage('');
                pushWarning('Hình ảnh không đúng định dạng , vui lòng chọn lại hình ảnh');
            }
        }
    };

    return { image, handleImageChange, img };
};

export default useImageUpload;
