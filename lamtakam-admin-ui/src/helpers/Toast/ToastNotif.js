import toast from "react-hot-toast";

export const renderHowToast = (toastText, state) => {
  return toast[state](toastText);
};
