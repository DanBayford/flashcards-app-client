import { Routes, Route } from "react-router";
import LoginPage from "./routes/auth/LoginPage";
import RegisterPage from "./routes/auth/RegisterPage";
import CategoriesPage from "./routes/CategoriesPage";
import QuestionsPage from "./routes/QuestionsPage";
import QuizPage from "./routes/QuizPage";
import AuthLayout from "./routes/layouts/AuthLayout";
import AppLayout from "./routes/layouts/AppLayout";
import { AuthRedirect } from "./components/auth";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthRedirect />} />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
