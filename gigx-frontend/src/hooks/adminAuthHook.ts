import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
  role: "client" | "worker" | "admin";
}

const useAdminAuth = () => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          console.error("Token has expired");
          setRole(null);
          localStorage.removeItem("token");
        } else {
          setRole(decoded.role);
        }
      } catch (err) {
        console.error("Invalid token");
        setRole(null);
      }
    } else {
      setRole(null);
    }

    setLoading(false);
  }, []);

  return {role, loading};
};

export default useAdminAuth;
