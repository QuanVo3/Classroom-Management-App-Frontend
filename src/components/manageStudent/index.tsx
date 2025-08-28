/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useUser } from "@/src/hooks/user";
import { useAuth } from "@/src/hooks/auth"; // để lấy currentUser + token
import { useEffect, useState } from "react";
import StudentForm from "../studentForm";
import ChatBox from "../chatBox";
// component chat bạn đã làm

const ManageStudents = () => {
  const { studentList, requestGetAllStudents, requestDeleteStudent } =
    useUser();
  const { userInfo } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  useEffect(() => {
    requestGetAllStudents.runAsync();
  }, []);

  const handleEditStudent = (student: any) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingStudent(null);
    requestGetAllStudents.runAsync();
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    setShowForm(true);
  };

  const renderLessonStatus = (student: any) => {
    if (!student.lessons || student.lessons.length === 0) {
      return <span className="text-gray-400 italic">No lessons</span>;
    }
    const total = student.lessons.length;
    const done = student.lessons.filter((l: any) => l.status === "done").length;
    const percent = Math.round((done / total) * 100);
    return (
      <div className="flex flex-col">
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-1">
          <div
            className="h-full bg-green-500 transition-all"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-600">
          {done}/{total} done
        </span>
      </div>
    );
  };

  return (
    <div className="flex gap-6">
      {/* Bảng danh sách */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
          <h1 className="text-2xl font-bold">Manage Students</h1>
          <div className="flex gap-2">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
              onClick={handleAddStudent}
            >
              + Add Student
            </button>
          </div>
        </div>

        <p className="mb-2 text-gray-600">{studentList.length} Students</p>

        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 text-left">Tên</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Trạng thái tài khoản</th>
                <th className="p-3 text-left">Hoàn thành</th>
                <th className="p-3 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {studentList.map((student) => (
                <tr
                  key={student.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 font-medium text-black">{student.name}</td>
                  <td className="p-3 text-black">{student.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        student.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="p-3">{renderLessonStatus(student)}</td>
                  <td className="p-3 space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEditStudent(student)}
                    >
                      Sửa
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => requestDeleteStudent.runAsync(student.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
              {studentList.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center p-4 text-gray-500 italic"
                  >
                    Không tìm thấy học sinh nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Khung chat */}
      {selectedStudent && (
        <div className="fixed bottom-5 right-4 w-80  bg-white rounded-t-lg shadow-xl border flex flex-col">
          <div className="flex items-center justify-between p-2 bg-blue-600 text-white rounded-t-lg">
            <span className="font-semibold">{selectedStudent.name}</span>
            <button onClick={() => setSelectedStudent(null)}>✕</button>
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatBox currentUser={userInfo} peerUser={selectedStudent} />
          </div>
        </div>
      )}

      {/* Modal form */}
      <StudentForm
        student={editingStudent || undefined}
        open={showForm}
        setIsOpen={setShowForm}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
};

export default ManageStudents;
