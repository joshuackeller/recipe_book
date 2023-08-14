import { useContext } from "react";
import { AuthContext } from "../components/wrappers/auth/AuthWrapper";

const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;
