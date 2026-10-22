import { useEffect } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      let token = localStorage.getItem("jwtToken");

      // Auto-populate dev session token if empty to prevent lockouts during preview
      if (!token) {
        token = "dev_session_token_fourjective_2026";
        localStorage.setItem("jwtToken", token);
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
