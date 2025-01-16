// import axios from "axios";
// import { useRecoilState } from "recoil";
// import { errorAtom } from "../store/atoms/atoms";

// export const axiosErrorHandler = (error:unknown,fallbackMessage:string) =>{
//     const [,setError] = useRecoilState(errorAtom)
//     if (axios.isAxiosError(error)) {
//         setError(error?.response?.data?.message || fallbackMessage);
//         // console.log(error);
//         throw error;
//       } else {
//         console.error(fallbackMessage);
//       }
// }