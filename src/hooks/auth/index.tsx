/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAtom } from "jotai";
import { useRequest } from "ahooks";
import { authAtom } from "@/src/jotai/user";
import { refreshTokenApi, sendOtp, verifyOtp } from "@/src/services/auth";

export const useAuth = () => {
  const [userInfo, setUserInfo] = useAtom(authAtom);

  const requestSendOtp = useRequest((phone: string) => sendOtp(phone), {
    manual: true,
    onError: (err: any) => console.log("Lỗi gửi OTP:", err),
  });

  const requestVerifyOtp = useRequest(
    (data: { phoneNumber: string; code: string }) => verifyOtp(data),
    {
      manual: true,
      onSuccess: (res: any) => {
        const { token, user } = res;
        setUserInfo({ token, user, isAuthenticated: true });
      },
      onError: (err: any) => console.log("Lỗi xác thực OTP:", err),
    }
  );

  const requestLoginRefreshToken = useRequest(() => refreshTokenApi(), {
    manual: true,
    onSuccess: (res: any) => {
      const { token, user } = res;
      setUserInfo({
        token,
        user,
        isAuthenticated: true,
      });
    },
    onError: (err: any) => {
      console.log("Đăng nhập thất bại lỗi:", err);
    },
  });

  return {
    userInfo,
    setUserInfo,
    requestSendOtp,
    requestVerifyOtp,
    requestLoginRefreshToken,
  };
};
