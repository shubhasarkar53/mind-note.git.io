import { Response } from "express";

// set cookie funtion def
export const setCookie = (res: Response, token: string) => {
  const options = {
    expires: new Date(
      Date.now() + Number(process.env.COOKIE_EXPIRE as string) * 60 * 60 * 100
    ), //from hours to milisec
    httpOnly: true,
    withCredientials: true,
  };
  res.cookie("SessionID", token, options);
};
