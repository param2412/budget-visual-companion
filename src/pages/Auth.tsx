
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

const Auth = () => {
  const { user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  // Redirect to dashboard if user is already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex min-h-screen bg-background flex-col">
      <div className="flex flex-col items-center justify-center w-full px-4 py-12 flex-1">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Expense Tracker</h1>
          <p className="text-muted-foreground mt-2">
            Manage your finances with ease
          </p>
        </div>

        <div className="w-full max-w-md">
          {isLogin ? (
            <LoginForm onToggleForm={toggleForm} />
          ) : (
            <RegisterForm onToggleForm={toggleForm} />
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted border-t mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <span className="text-sm text-muted-foreground">
                Terms & Conditions
              </span>
              <span className="text-sm text-muted-foreground">
                Privacy Policy
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Made by <span className="font-semibold text-primary">P & D Technology</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Auth;
