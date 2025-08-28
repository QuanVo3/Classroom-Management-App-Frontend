/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FC, useEffect, useState } from "react";
import { useUser } from "@/src/hooks/user";
import { useAuth } from "@/src/hooks/auth";

interface MyProfileProps {
  onSuccess?: () => void;
}

const MyProfile: FC<MyProfileProps> = ({ onSuccess }) => {
  const { requestUpdateUserInfo } = useUser();
  const { userInfo } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (userInfo) {
      setName(userInfo?.user?.name || "");
      setEmail(userInfo?.user?.email || "");
      setPhone(userInfo?.user?.phone || "");
    }
  }, [userInfo]);

  const handleSubmit = async () => {
    if (!name || !email || !phone) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await requestUpdateUserInfo.runAsync({
        id: userInfo?.user?.id,
        name,
        email,
        phone,
      });
      setSuccess("✅ Cập nhật thông tin thành công!");
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err?.message || "❌ Không thể cập nhật thông tin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-full bg-white p-6 rounded-lg shadow-md border border-gray-200">
      {/* Header */}
      <div className="mb-6 pb-3 border-b border-gray-200">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Cập nhật hồ sơ cá nhân
        </h2>
        <p className="text-sm text-gray-500">
          Chỉnh sửa thông tin của bạn bên dưới
        </p>
      </div>

      {/* Alert */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4 rounded">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}
      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-3 mb-4 rounded">
          <p className="text-green-700 font-medium">{success}</p>
        </div>
      )}

      {/* Form fields */}
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Họ tên
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" text-gray-800 w-full border border-gray-300 rounded px-3 py-2 
              focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Nhập họ tên"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" text-gray-800 w-full border border-gray-300 rounded px-3 py-2 
              focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Nhập email"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Số điện thoại
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="text-gray-800 w-full border border-gray-300 rounded px-3 py-2 
              focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Nhập số điện thoại"
          />
        </div>
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 
          text-white font-semibold py-2.5 rounded-md shadow hover:from-blue-600 
          hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 
          disabled:opacity-70 transition"
      >
        {loading ? "Đang lưu..." : "💾 Lưu thay đổi"}
      </button>
    </div>
  );
};

export default MyProfile;
