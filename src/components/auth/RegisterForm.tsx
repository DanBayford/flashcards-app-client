import { useEffect } from "react";
import { useAuth } from "@/hooks";
import api from "@/lib/api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { TRegisterRequest } from "@/types";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords do not match"),
  })
  .required();

type RegisterFormValues = yup.InferType<typeof schema>;

export const RegisterForm = () => {
  const navigate = useNavigate();

  const { setAccessToken, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(schema),
    mode: "onSubmit", // initial validation
    // reValidateMode: "onChange", // subsequent revalidation on changes
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: api.User.register,
    onSuccess: (data) => {
      // Set AuthContext
      setAccessToken(data?.accessToken);
      setUser(data?.userInfo);
      navigate("/questions");
    },
  });

  // confirmPassword field not required by mutation
  const onSubmitHandler = handleSubmit(
    async (values: TRegisterRequest & { confirmPassword: string }) =>
      await mutateAsync({ email: values.email, password: values.password })
  );

  useEffect(() => {
    console.log("errors", errors, isValid);
  }, [errors, isValid]);

  return (
    <form
      onSubmit={onSubmitHandler}
      noValidate
      className="p-4 flex flex-col gap-4 justify-center"
    >
      <div>
        <Label htmlFor="email" className="mb-2">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
        />
        {errors.email && <p role="alert">{errors.email.message}</p>}
      </div>
      <div style={{ marginTop: 12 }}>
        <Label htmlFor="password" className="mb-2">
          Password
        </Label>
        <Input id="password" type="password" {...register("password")} />
        {errors.password && <p role="alert">{errors.password.message}</p>}
      </div>
      <div style={{ marginTop: 12 }}>
        <Label htmlFor="password" className="mb-2">
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p role="alert">{errors.confirmPassword.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting} style={{ marginTop: 16 }}>
        {isSubmitting ? "Registering..." : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;
