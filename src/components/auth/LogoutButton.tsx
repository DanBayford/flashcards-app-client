import { useAuth } from "@/hooks";
import api from "@/lib/api";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const { setAccessToken, setUser } = useAuth();

  const logOutUser = () => {
    setAccessToken(null);
    setUser(null);
    navigate("/login");
  };

  const { mutateAsync } = useMutation({
    mutationFn: api.User.logout,
    // onSettled == always executed (success or error)
    onSuccess: logOutUser,
  });

  const onClickHandler = async () => await mutateAsync();

  return <Button onClick={onClickHandler}>Logout</Button>;
};
