/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useLesson } from "@/src/hooks/lesson";
import LessonForm from "../lessonForm";

const ManageLessons = () => {
  const { myLessons, requestGetMyLessons, requestDeleteLesson } = useLesson();

  const [showForm, setShowForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState<any>(null);

  useEffect(() => {
    requestGetMyLessons.runAsync();
  }, []);

  const handleAddClick = () => {
    setEditingLesson(null);
    setShowForm(true);
  };

  const handleEditClick = (lesson: any) => {
    setEditingLesson(lesson);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingLesson(null);
    requestGetMyLessons.runAsync();
  };

  const handleDeleteClick = async (lessonId: string) => {
    await requestDeleteLesson.runAsync(lessonId);
  };

  return (
    <>
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
          <h1 className="text-2xl font-bold text-gray-800">Quản lý bài học</h1>
          <div className="flex gap-2">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow transition"
              onClick={handleAddClick}
            >
              + Thêm bài học
            </button>
          </div>
        </div>

        <p className="mb-3 text-gray-600 text-sm">
          {myLessons.length} {myLessons.length === 1 ? "bài học" : "bài học"}
        </p>

        {/* Table container */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 text-left font-bold">Tiêu đề</th>
                <th className="p-3 text-left font-bold">Mô tả</th>
                <th className="p-3 text-left font-bold">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {myLessons.map((lesson: any) => (
                <tr
                  key={lesson.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 font-medium text-gray-800">
                    {lesson.title}
                  </td>
                  <td className="p-3 text-gray-700">{lesson.description}</td>
                  <td className="p-3 space-x-3">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEditClick(lesson)}
                    >
                      Sửa
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDeleteClick(lesson.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}

              {myLessons.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center p-4 text-gray-500 italic"
                  >
                    Không tìm thấy bài học nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      <LessonForm
        lesson={editingLesson || undefined}
        open={showForm}
        setIsOpen={setShowForm}
        onSuccess={handleFormSuccess}
      />
    </>
  );
};

export default ManageLessons;
