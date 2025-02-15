import { useRecoilState } from "recoil";
import { appLoadingAtom, authAtom, errorAtom, loadingAtom, userAtom } from "../atoms/atoms";
import {
  fetchCurrentUser,
  ICredentials,
  logout,
  signin,
  signInCredentialsType,
  signup,
} from "../actions/authActions";
import axios from "axios";

export const useAuth = () => {
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const [appLoading, setAppLoading] = useRecoilState(appLoadingAtom);
  const [error, setError] = useRecoilState(errorAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authAtom);

  //signup
  const handleSignup = async (cred: ICredentials) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await signup(cred);
      console.log("after signup data:", data);
      if (data) {
        setUser(data.user);
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error?.response?.data?.message);
        // console.log(error);
        throw error;
      } else {
        console.error("Failed to signup");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  //signin
  const handleSignin = async (cred: signInCredentialsType) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await signin(cred);
      console.log("after signin data:", data);
      if (data) {
        setUser(data.user);
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error?.response?.data?.message);
        // console.log(error);
        throw error;
      } else {
        console.error("Failed to signin");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  //logout
  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await logout();
      console.log("after logout data:", data);
      if (data) {
        setUser(null);
        setIsAuthenticated(false);
        return true;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error?.response?.data?.message);
        // console.log(error);
        throw error;
      } else {
        console.error("Failed to logout");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  //loadUser


  const loadUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await fetchCurrentUser();
      console.log("Current user details:", data);
      if (data) {
        setUser(data.user);
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error?.response?.data?.message);
        setIsAuthenticated(false);
        // console.log(error);
        throw error;
      } else {
        console.error("Failed to load user");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

// ---------------- DOnt delete this comment -- try to fix the flash of signin page

  // const loadUser = async () => {
  //   setAppLoading(true);
  //   setError(null);
  //   try {
  //     const { data } = await fetchCurrentUser();
  //     console.log("Current user details:", data);
  //     if (data) {
  //       setUser(data.user);
  //       setIsAuthenticated(true);
  //       return true;
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       setError(error?.response?.data?.message);
  //       setIsAuthenticated(false);
  //       // console.log(error);
  //       throw error;
  //     } else {
  //       console.error("Failed to load user");
  //     }
  //     return false;
  //   } finally {
  //     setAppLoading(false);
  //   }
  // };
// ----------------

  return { handleSignup, handleSignin, handleLogout, loadUser };
};
