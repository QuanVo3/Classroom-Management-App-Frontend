/* eslint-disable @typescript-eslint/no-explicit-any */
import { Axios } from ".";
import { PATH } from "./path";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// 🔐 Gửi mã OTP
export const sendOtp = async (phone: string) => {
  const URL = `${PATH.send_otp}`;
  return await Axios.post(
    URL,
    { phoneNumber: phone },
    { baseURL: BASE_URL, withCredentials: true }
  );
};

// 🔐 Xác thực mã OTP
export const verifyOtp = async ({
  phoneNumber,
  code,
}: {
  phoneNumber: string;
  code: string;
}) => {
  const URL = PATH.login;
  return await Axios.post(
    URL,
    { phoneNumber, code },
    { baseURL: BASE_URL, withCredentials: true }
  );
};

export const refreshTokenApi = async () => {
  const URL = PATH.login_with_refresh_token;
  return await Axios.post(
    URL,
    {},
    { baseURL: BASE_URL, withCredentials: true }
  );
};
