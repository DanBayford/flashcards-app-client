import { RegisterForm } from "@/components/auth";
import { Link } from "react-router";

const RegisterPage = () => {
  return (
    <>
      <RegisterForm />
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-400 hover:text-blue-200">
          Sign in!
        </Link>
      </p>
    </>
  );
};

export default RegisterPage;
