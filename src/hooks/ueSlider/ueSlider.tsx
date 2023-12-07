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
    };

    return {
        sliderValue,
        handleChange,
    };
};

export default useSlider;
