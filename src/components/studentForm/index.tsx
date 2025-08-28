/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FC, useState, useEffect } from "react";
import { useUser } from "@/src/hooks/user";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface StudentFormProps {
  student?: Student;
  open: boolean;
  setIsOpen: (value: boolean) => void;
  onSuccess?: () => void;
}

const StudentForm: FC<StudentFormProps> = ({
  student,
  open,
  setIsOpen,
  onSuccess,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { requestAddStudent, requestUpdateUserInfo } = useUser();

  useEffect(() => {
    if (student) {
      setName(student.name);
      setEmail(student.email);
      setPhone(student.phone);
    } else {
      setName("");
      setEmail("");
      setPhone("");
    }
  }, [student, open]);

  const handleSubmit = async () => {
    if (!name || !email || !phone) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setLoading(true);
    try {
      if (student) {
        await requestUpdateUserInfo.runAsync({
          id: student.id,
          name,
          email,
          phone,
        });
      } else {
        await requestAddStudent.runAsync({ name, email, phone });
      }
      setError("");
      setIsOpen(false);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err?.message || "Không thể lưu học sinh");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6 animate-fadeIn">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-5 text-gray-800">
          {student ? "Chỉnh sửa học sinh" : "Thêm học sinh mới"}
        </h2>

        {/* Error */}
        {error && (
          <p className="bg-red-50 border border-red-200 text-red-600 text-sm p-2 rounded mb-4">
            {error}
          </p>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên học sinh
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-black w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
              placeholder="Nhập tên..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
              placeholder="Nhập email..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="text-black w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
              placeholder="Nhập số điện thoại..."
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 rounded-md shadow hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring focus:ring-blue-300 disabled:opacity-70 disabled:cursor-not-allowed transition"
        >
          {loading ? "Đang lưu..." : student ? "Cập nhật" : "Thêm học sinh"}
        </button>
      </div>
    </div>
  );
};

export default StudentForm;
