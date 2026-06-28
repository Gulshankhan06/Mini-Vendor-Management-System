import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginSuccess({ setIsAuthenticated }: any) {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    console.log("TOKEN:", token);

    if (token) {
      // 1. Save token
      localStorage.setItem("token", token);

      // 2. Mark logged in
      localStorage.setItem("isAuthenticated", "true");

      // 3. Update React state
      setIsAuthenticated(true);

      // 4. Redirect to home page
      navigate("/", { replace: true });
    } else {
      // agar token nahi mila
      navigate("/login");
    }
  }, []);

  return <div>Logging you in...</div>;
}

export default LoginSuccess;