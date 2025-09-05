/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAtom } from "jotai";
import { useRequest } from "ahooks";
import { studentListAtom, selectedStudentAtom } from "@/src/jotai/user";
import {
  addStudent,
  deleteStudent,
  updateUserInfo,
  getAllStudents,
  getStudentDetail,
} from "@/src/services/user";
import { useAuth } from "../auth";

export const useUser = () => {
  const { userInfo } = useAuth();
  const [studentList, setStudentList] = useAtom(studentListAtom);
  const [selectedStudent, setSelectedStudent] = useAtom(selectedStudentAtom);

  //Lấy danh sách học sinh
  const requestGetAllStudents = useRequest(
    () => getAllStudents(userInfo?.token as string),
    {
      manual: true,
      onSuccess: (res: any) => {
        setStudentList(res?.students);
      },
      onError: (err: any) => console.log("Lỗi lấy danh sách học sinh:", err),
    }
  );

  //Lấy chi tiết học sinh
  const requestGetStudentDetail = useRequest(
    (id: string) => getStudentDetail(id, userInfo?.token as string),
    {
      manual: true,
      onSuccess: (res: any) => {
        setSelectedStudent(res);
      },
      onError: (err: any) => console.log("Lỗi lấy chi tiết học sinh:", err),
    }
  );

  //Thêm học sinh
  const requestAddStudent = useRequest(
    (data: any) => addStudent(data, userInfo?.token as string),
    {
      manual: true,
      onSuccess: () => {
        requestGetAllStudents.runAsync(); // reload danh sách
      },
      onError: (err: any) => console.log("Lỗi thêm học sinh:", err),
    }
  );
  const requestDeleteStudent = useRequest(
    (id: string) => deleteStudent(id, userInfo?.token as string),
    {
      manual: true,
      onSuccess: () => {
        requestGetAllStudents.runAsync(); // reload danh sách
      },
      onError: (err: any) => console.log("Lỗi xoá học sinh:", err),
    }
  );

  //Sửa thông tin người dùng
  const requestUpdateUserInfo = useRequest(
    (data: any) => updateUserInfo(data, userInfo?.token as string),
    {
      manual: true,
      onSuccess: () => {
        requestGetAllStudents.runAsync();
      },
      onError: (err: any) => console.log("Lỗi cập nhật thông tin:", err),
    }
  );

  return {
    studentList,
    selectedStudent,
    setSelectedStudent,
    requestGetAllStudents,
    requestGetStudentDetail,
    requestAddStudent,
    requestDeleteStudent,
    requestUpdateUserInfo,
  };
};
