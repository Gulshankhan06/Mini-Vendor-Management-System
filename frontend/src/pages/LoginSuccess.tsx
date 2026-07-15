import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginSuccess({ setIsAuthenticated }: any) {
  const navigate = useNavigate();

  useEffect(() => {
  const login = async () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    localStorage.setItem("token", token);
    localStorage.setItem("isAuthenticated", "true");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
if (data.success) {
  localStorage.setItem("user", JSON.stringify(data.user));

  setIsAuthenticated(true);

  // Sirf Home page par redirect karo
  navigate("/", { replace: true });
} else {
  navigate("/login");
}
      
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  login();
}, []);

  return <div>Logging you in...</div>;
}

export default LoginSuccess;