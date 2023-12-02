//backOff
export const fetchWithRetry = async (apiUrl: string, errorCount: number = 2) => {
    const ERROR_COUNT_MAX = 3;

    const response = await fetch(apiUrl);
    if (response.status < 200 || response.status >= 300) {
        if (errorCount > ERROR_COUNT_MAX) {
            setTimeout(() => {}, Math.pow(2, errorCount) * 3000 + Math.random() * 1000);
        }
    }
    return response;
};
