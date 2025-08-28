/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useLesson } from "@/src/hooks/lesson";

const MyLesson = () => {
  const { requestGetMyLessons, requestMarkLessonDone } = useLesson();
  const [lessons, setLessons] = useState<any[]>([]);

  useEffect(() => {
    requestGetMyLessons.runAsync().then((res) => {
      if (res?.lessons) setLessons(res.lessons);
    });
  }, []);

  const handleMarkDone = async (lessonId: string) => {
    await requestMarkLessonDone.runAsync(lessonId);
    setLessons((prev) =>
      prev.map((l) => (l.lessonId === lessonId ? { ...l, status: "done" } : l))
    );
  };

  const total = lessons.length;
  const done = lessons.filter((l) => l.status === "done").length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">📚 Bài học của tôi</h1>

      {/* Progress tổng */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Hoàn thành {done}/{total} bài
        </p>
      </div>

      {/* Danh sách bài */}
      <div className="space-y-4">
        {lessons.map((l) => (
          <div
            key={l.lessonId}
            className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition"
          >
            <h2 className="font-semibold text-lg">{l.lesson?.title}</h2>
            <p className="text-gray-600 mb-3">{l.lesson?.description}</p>
            <div className="flex justify-between items-center">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  l.status === "done"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {l.status}
              </span>
              {l.status !== "done" && (
                <button
                  onClick={() => handleMarkDone(l.lessonId)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition"
                >
                  Hoàn thành
                </button>
              )}
            </div>
          </div>
        ))}
        {lessons.length === 0 && (
          <p className="text-gray-500 italic">Chưa có bài học nào được giao.</p>
        )}
      </div>
    </div>
  );
};

export default MyLesson;
