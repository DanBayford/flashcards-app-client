import { useAuth } from "@/hooks";
import { useNavigate } from "react-router";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { TLoginRequest } from "@/types";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: yup.string().required("Password is required"),
  })
  .required();

// Let yup infer the schema type for useForm instead of using TLoginRequest
type LoginFormValues = yup.InferType<typeof schema>;

export const LoginForm = () => {
  const navigate = useNavigate();

  const { setAccessToken, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
    mode: "onSubmit", // initial validation
    reValidateMode: "onChange", // subsequent revalidation on changes
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: api.User.login,
    onSuccess: (data) => {
      // Set AuthContext
      setAccessToken(data?.accessToken);
      setUser(data?.userInfo);
      navigate("/questions");
    },
  });

  const onSubmitHandler = handleSubmit(
    async (values: TLoginRequest) => await mutateAsync(values)
  );

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
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register("password")}
        />
        {errors.password && <p role="alert">{errors.password.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting} style={{ marginTop: 16 }}>
        {isSubmitting ? "Logging in..." : "Log in"}
      </Button>
    </form>
  );
};
