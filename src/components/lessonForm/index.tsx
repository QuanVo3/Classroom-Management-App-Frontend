/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FC, useEffect, useState } from "react";
import { useLesson } from "@/src/hooks/lesson";
import { useUser } from "@/src/hooks/user";

interface Lesson {
  id?: string;
  title: string;
  description: string;
}

interface LessonFormProps {
  lesson?: Lesson;
  open: boolean;
  setIsOpen: (value: boolean) => void;
  onSuccess?: () => void;
}

const LessonForm: FC<LessonFormProps> = ({
  lesson,
  open,
  setIsOpen,
  onSuccess,
}) => {
  const { requestAssignLesson, requestUpdateLesson } = useLesson();
  const { studentList, requestGetAllStudents } = useUser();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load danh sách học sinh khi mở form
  useEffect(() => {
    if (open && studentList.length === 0) {
      requestGetAllStudents.runAsync();
    }
  }, [open]);

  // Điền dữ liệu nếu có lesson (edit)
  useEffect(() => {
    if (lesson) {
      setTitle(lesson.title);
      setDescription(lesson.description);
    } else {
      setTitle("");
      setDescription("");
      setSelectedStudents([]);
    }
  }, [lesson, open]);

  const handleSubmit = async () => {
    if (!title || !description || selectedStudents.length === 0) {
      setError("Vui lòng nhập đầy đủ thông tin và chọn học sinh");
      return;
    }

    setLoading(true);
    try {
      if (lesson?.id) {
        await requestUpdateLesson.runAsync({
          id: lesson?.id,
          title,
          description,
          studentIds: selectedStudents,
        });
      } else {
        await requestAssignLesson.runAsync({
          title,
          description,
          studentIds: selectedStudents,
        });
      }
      setError("");
      setIsOpen(false);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err?.message || "Không thể lưu bài học");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="relative max-w-md w-full bg-white rounded-lg shadow-xl p-6 animate-fadeIn">
        {/* Nút đóng */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-5 text-gray-800">
          {lesson ? "Chỉnh sửa bài học" : "Thêm bài học mới"}
        </h2>

        {error && (
          <p className="bg-red-50 border border-red-200 text-red-600 text-sm p-2 rounded mb-4">
            {error}
          </p>
        )}

        {/* Tiêu đề */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tiêu đề
          </label>
          <input
            type="text"
            placeholder="Nhập tiêu đề bài học..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-gray-800 w-full border border-gray-300 rounded-md px-3 py-2 
              focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        {/* Mô tả */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mô tả
          </label>
          <textarea
            placeholder="Nhập mô tả..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-gray-800 w-full border border-gray-300 rounded-md px-3 py-2 h-24 
              focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        {/* Chọn học sinh */}
        {/* Chọn học sinh */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chọn học sinh
          </label>

          <div className="border border-gray-300 rounded-md p-3 max-h-40 overflow-y-auto space-y-2">
            {studentList.map((s: any) => (
              <label
                key={s.id}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={s.id}
                  checked={selectedStudents.includes(s.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedStudents((prev) => [...prev, s.id]);
                    } else {
                      setSelectedStudents((prev) =>
                        prev.filter((id) => id !== s.id)
                      );
                    }
                  }}
                  className="accent-blue-600"
                />
                <span className="text-gray-800">
                  {s.name}{" "}
                  <span className="text-gray-500 text-sm">({s.email})</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Nút lưu */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white 
            font-semibold py-2 rounded-md shadow hover:from-blue-600 hover:to-blue-700 
            focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-70 transition"
        >
          {loading ? "Đang lưu..." : lesson ? "Cập nhật" : "Thêm bài học"}
        </button>
      </div>
    </div>
  );
};

export default LessonForm;
