import axios from "axios";
import { baseUrl } from "../../baseUrl";

export interface ICredentials {
  username: string;
  password: string;
  fullname: string;
}
 export type signInCredentialsType = Pick<ICredentials,"username" | "password">

export const signup = async (cred: ICredentials) => {
    //call
    return await axios.post(`${baseUrl}/auth/signup`,cred,{withCredentials:true})
};
export const signin = async (cred: signInCredentialsType) => {
    return await axios.post(`${baseUrl}/auth/signin`,cred,{withCredentials:true})
};
export const logout = async () => {
    return await axios.get(`${baseUrl}/auth/logout`,{withCredentials:true})
};
export const fetchCurrentUser = async () => {
    return await axios.get(`${baseUrl}/user/me`,{withCredentials:true})
};
