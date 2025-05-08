
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
    <div className="flex min-h-screen bg-background">
      <div className="flex flex-col items-center justify-center w-full px-4 py-12">
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
    </div>
  );
};

export default Auth;
