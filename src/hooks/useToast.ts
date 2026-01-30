import { toast } from "react-toastify";

export const useToast = () => {
  const successToast = (successMessage: string = "Success!") => {
    toast.success(successMessage);
  };

  const warningToast = (warningMessage: string = "Warning!") => {
    toast.warning(warningMessage);
  };

  const errorToast = (errorMessage: string = "Error!") => {
    toast.error(errorMessage);
  };

  return {
    successToast,
    warningToast,
    errorToast,
  };
};
