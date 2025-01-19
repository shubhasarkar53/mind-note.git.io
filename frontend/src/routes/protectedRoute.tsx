import React  from "react";
import { useRecoilValue } from "recoil";
import { authAtom, loadingAtom } from "../store/atoms/atoms";
import { useNavigate } from "react-router-dom";

interface Props {
    children: React.ReactNode;
  }
export const ProtectedRoute:React.FC<Props> = ({ children } ) =>{

    const isAuthenticated = useRecoilValue(authAtom);
    const isLoading = useRecoilValue(loadingAtom);
    const navigateTo = useNavigate();

    // if (isLoading) {
    //   // Show a loader while checking authentication status
    //   return <div>Loading...</div>;
    // }
  
   
    if (!isAuthenticated) {
      navigateTo("/signin")
      return null;
    }

    return <>{children}</>;

}