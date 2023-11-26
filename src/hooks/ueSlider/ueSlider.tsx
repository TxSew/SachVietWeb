import { useState } from 'react';

export interface SliderHook {
    sliderValue: number | number[];
    handleChange: (event: Event, newValue: number | number[]) => void;
}

const useSlider = (): SliderHook => {
    const [sliderValue, setSliderValue] = useState<number | number[]>([1, 0]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setSliderValue(newValue);
        const [a, b] = newValue as number[];
        console.log('🚀 ~ file: ueSlider.tsx:14 ~ handleChange ~ b:', b);
        console.log('🚀 ~ file: ueSlider.tsx:14 ~ handleChange ~ a:', a);
    };

    return {
        sliderValue,
        handleChange,
    };
};

export default useSlider;
