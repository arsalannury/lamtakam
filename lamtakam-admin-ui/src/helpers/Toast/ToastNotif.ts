import toast from "react-hot-toast";

export const renderHowToast: Function = (toastText: string, state: string) => {
  return (toast as any)[state](toastText);
};
