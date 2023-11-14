import { useState } from "react";
import { toast, ToastOptions } from "react-toastify";

interface UseToast {
  showToast: (
    message: string,
    options?: ToastOptions,
    onCloseCallback?: () => void
  ) => string;
  showErrorToast: (errorMessage: string, options?: ToastOptions) => string;
}

const useToast = (): UseToast => {
  const [toastId, setToastId] = useState<string | null>(null);

  const showToast = (
    message: string,
    options: ToastOptions = {},
    onCloseCallback?: () => void
  ): string => {
    if (toastId) {
      toast.dismiss(toastId);
    }

    const id: any = toast(message, {
      ...options,
      onClose: () => {
        setToastId(null);
        if (onCloseCallback) {
          onCloseCallback();
        }
      },
    });
    setToastId(id);

    return id;
  };

  const showErrorToast = (
    errorMessage: string,
    options: ToastOptions = {}
  ): string => {
    return showToast(errorMessage, {
      type: toast.TYPE.ERROR,
      ...options,
    });
  };

  return { showToast, showErrorToast };
};

export default useToast;
