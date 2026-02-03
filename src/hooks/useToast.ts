import { toast } from "react-toastify";
import { Toast } from "@/components";

export const useToast = () => {
  /*
  Note somes styles on toast container overridden in styles.css
  */

  const successToast = (successMessage: string = "Success!") => {
    toast(Toast, {
      closeButton: false,
      className: "border border-black !bg-green-500 !text-white",
      ariaLabel: "success-toast",
      hideProgressBar: true,
      autoClose: 3000,
      data: { message: successMessage },
    });
  };

  const warningToast = (warningMessage: string = "Warning!") => {
    toast(Toast, {
      closeButton: false,
      className: "border border-black !bg-blue-500 !text-white",
      ariaLabel: "warning-toast",
      hideProgressBar: true,
      autoClose: 3000,
      data: { message: warningMessage },
    });
  };

  const errorToast = (errorMessage: string = "Error!") => {
    toast(Toast, {
      closeButton: false,
      className: "border border-black !bg-red-500 !text-white",
      ariaLabel: "error-toast",
      hideProgressBar: true,
      autoClose: 3000,
      data: { message: errorMessage },
    });
  };

  return {
    successToast,
    warningToast,
    errorToast,
  };
};
