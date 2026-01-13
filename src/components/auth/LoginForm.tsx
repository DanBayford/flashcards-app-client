import { useAuth } from "@/hooks";
import { useNavigate } from "react-router";
import api from "@/lib/api";
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
    formState: { errors, isSubmitting, isValid },
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
      // Navigate to Quiz page
      navigate("/questions"); // Questions for now to check hooks
    },
  });

  const onSubmitHandler = handleSubmit(
    async (values: TLoginRequest) => await mutateAsync(values)
  );

  return (
    <form onSubmit={onSubmitHandler} noValidate>
      Login Form
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
        />
        {errors.email && <p role="alert">{errors.email.message}</p>}
      </div>
      <div style={{ marginTop: 12 }}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register("password")}
        />
        {errors.password && <p role="alert">{errors.password.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting || !isValid}
        style={{ marginTop: 16 }}
      >
        {isSubmitting ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
};
