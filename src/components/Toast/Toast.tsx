import { toast } from 'react-toastify';
import { color } from '../../Theme/color';

const pushSuccess = (message: string) => {
    toast.success(message, {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="12" fill="#009D4F" />
                <path
                    d="M7.25244 12L10.4174 15.165L16.7474 8.83496"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
        bodyStyle: {},
        position: 'top-right',
        style: {
            background: color.BtnDartGreen,
            paddingLeft: `16px`,
            borderLeft: `2px solid ${color.text}`,
            color: color.sale,
            boxShadow: 'none',
        },
    });
};

const pushError = (message: string) => {
    toast.error(message, {
        icon: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11 1C16.5222 1 21 5.47676 21 11C21 16.5222 16.5222 21 11 21C5.47676 21 1 16.5222 1 11C1 5.47676 5.47676 1 11 1Z"
                    stroke="#E01B00"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M10.9942 6.89636V11.6737"
                    stroke="#E01B00"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M10.9941 15.1038H11.0049"
                    stroke="#E01B00"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
        position: 'top-right',
        style: {
            background: '#F7E4E1',
            paddingLeft: `16px`,
            borderLeft: `2px solid ${color.error}`,
            color: color.text_color,
            boxShadow: 'none',
        },
    });
};

const pushWarning = (message: string) => {
    toast.error(message, {
        icon: (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11 1C16.5222 1 21 5.47676 21 11C21 16.5222 16.5222 21 11 21C5.47676 21 1 16.5222 1 11C1 5.47676 5.47676 1 11 1Z"
                    stroke="#faad14"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M10.9942 6.89636V11.6737"
                    stroke="#faad14"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M10.9941 15.1038H11.0049"
                    stroke="#faad14"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
        position: 'top-right',
        style: {
            background: '#FFF1B8',
            paddingLeft: `16px`,
            borderLeft: `2px solid #faad14`,
            color: color.text_color,
            boxShadow: 'none',
        },
    });
};

export { pushSuccess, pushError, pushWarning };
