import { useAuth } from "@/hooks";
import api from "@/lib/api";
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
    reValidateMode: "onChange", // subsequent revalidation on changes
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
      // Navigate to Quiz page
      navigate("/questions"); // Questions for now to check hooks
    },
  });

  const onSubmitHandler = handleSubmit(
    async (values: TRegisterRequest) => await mutateAsync(values)
  );

  return (
    <form onSubmit={onSubmitHandler} noValidate>
      Register Form
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
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
