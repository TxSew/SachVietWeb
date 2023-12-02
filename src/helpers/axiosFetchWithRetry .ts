// import axios, { AxiosResponse } from 'axios';

// const ERROR_COUNT_MAX = 3;

// export const axiosFetchWithRetry = async (apiUrl: string, errorCount: number = 0): Promise<AxiosResponse<any>> => {
//     try {
//         const response = await axios.post(apiUrl, props);

//         if (response.status < 200 || response.status >= 300) {
//             if (errorCount < ERROR_COUNT_MAX) {
//                 // Apply exponential backoff
//                 await new Promise((resolve) =>
//                     setTimeout(resolve, Math.pow(2, errorCount) * 3000 + Math.random() * 1000)
//                 );
//                 // Retry the request recursively
//                 return axiosFetchWithRetry(apiUrl, errorCount + 1);
//             }
//         }

//         return response;
//     } catch (error) {
//         if (errorCount < ERROR_COUNT_MAX) {
//             // Apply exponential backoff
//             await new Promise((resolve) => setTimeout(resolve, Math.pow(2, errorCount) * 3000 + Math.random() * 1000));
//             // Retry the request recursively
//             return axiosFetchWithRetry(apiUrl, errorCount + 1);
//         } else {
//             throw error;
//         }
//     }
// };
