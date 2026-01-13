import { BrowserRouter as Router } from "react-router";
import AppRoutes from "./routes";
import { AuthProvider } from "./contexts/AuthContextProvider";
import { queryClient } from "./lib/cache";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="font-sans">
          <Router>
            <AppRoutes />
          </Router>
        </div>
      </AuthProvider>
      <ToastContainer />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
