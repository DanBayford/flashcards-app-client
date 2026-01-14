import { LoginForm } from "@/components/auth";
import { Link } from "react-router";

const LoginPage = () => {
  return (
    <div>
      <LoginForm />
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-400 hover:text-blue-200">
          Sign up!
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
