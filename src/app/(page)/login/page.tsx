/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/hooks/auth";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const router = useRouter();
  const { requestSendOtp, requestVerifyOtp } = useAuth();

  const formatPhone = (raw: string) => {
    const cleaned = raw.replace(/\D/g, "");
    return cleaned.startsWith("0")
      ? "+84" + cleaned.slice(1)
      : cleaned.startsWith("84")
      ? "+84" + cleaned.slice(2)
      : cleaned.startsWith("+84")
      ? cleaned
      : "+84" + cleaned;
  };

  const handleSendOtp = async () => {
    const formatted = formatPhone(phone);
    if (!/^(\+84)(3|5|7|8|9)\d{8}$/.test(formatted)) {
      setError("Số điện thoại không hợp lệ");
      return;
    }
    try {
      await requestSendOtp.runAsync(formatted);
      setPhone(formatted);
      setStep(2);
      setError("");
    } catch (err: any) {
      setError(err?.message || "Không thể gửi mã OTP");
    }
  };

  const handleVerifyOtp = async () => {
    if (code.length !== 6) {
      setError("Mã OTP phải gồm 6 chữ số");
      return;
    }
    try {
      const res = await requestVerifyOtp.runAsync({
        phoneNumber: phone,
        code,
      });
      router.push(res?.user?.role === "teacher" ? "/instructor" : "/student");
    } catch (err: any) {
      setError(err?.message || "Xác thực thất bại");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        {/* Tiêu đề */}
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          {step === 1 ? "Đăng nhập" : "Xác thực OTP"}
        </h2>

        {/* Thông báo lỗi */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded">
            {error}
          </div>
        )}

        {/* Input */}
        <input
          type="text"
          placeholder={step === 1 ? "Nhập số điện thoại" : "Nhập mã OTP"}
          value={step === 1 ? phone : code}
          onChange={(e) =>
            step === 1 ? setPhone(e.target.value) : setCode(e.target.value)
          }
          className="text-gray-800 w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
        />

        {/* Nút hành động */}
        <button
          onClick={step === 1 ? handleSendOtp : handleVerifyOtp}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 rounded-lg shadow hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
        >
          {step === 1 ? "Gửi mã OTP" : "Xác nhận"}
        </button>

        {/* Chú thích nhỏ */}
        <p className="text-center text-sm text-gray-500 mt-4">
          {step === 1
            ? "Nhập số điện thoại của bạn để nhận mã OTP"
            : "Nhập mã OTP gồm 6 chữ số được gửi về điện thoại của bạn"}
        </p>
      </div>
    </div>
  );
}
