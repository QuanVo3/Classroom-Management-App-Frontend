/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAtom } from "jotai";
import { useRequest } from "ahooks";

import { lessonListAtom } from "@/src/jotai/lesson";
import {
  assignLesson,
  deleteLesson,
  getMyLessons,
  markLessonDone,
  updateLesson,
} from "@/src/services/lessons";
import { useAuth } from "../auth";

export const useLesson = () => {
  const { userInfo } = useAuth();
  const [myLessons, setMyLessons] = useAtom(lessonListAtom);

  // 📚 Lấy danh sách bài học của học sinh
  const requestGetMyLessons = useRequest(
    () => getMyLessons(userInfo?.token as string),
    {
      manual: true,
      onSuccess: (res: any) => {
        setMyLessons(res?.lessons || []);
      },
      onError: (err: any) => {
        console.error("Lỗi lấy danh sách bài học:", err);
      },
    }
  );

  // 📚 Giao bài học
  const requestAssignLesson = useRequest(
    (data: any) => assignLesson(data, userInfo?.token as string),
    {
      manual: true,
      onSuccess: () => {
        // Nếu đang ở giao diện danh sách của học sinh thì có thể reload
        requestGetMyLessons.runAsync();
      },
      onError: (err: any) => {
        console.error("Lỗi giao bài học:", err);
      },
    }
  );

  // 📚 Đánh dấu hoàn thành
  const requestMarkLessonDone = useRequest(
    (lessonId: string) => markLessonDone(lessonId, userInfo?.token as string),
    {
      manual: true,
      onSuccess: () => {
        requestGetMyLessons.runAsync();
      },
      onError: (err: any) => {
        console.error("Lỗi đánh dấu hoàn thành bài học:", err);
      },
    }
  );

  const requestDeleteLesson = useRequest(
    (lessonId: string) => deleteLesson(lessonId, userInfo?.token as string),
    {
      manual: true,
      onSuccess: () => {
        requestGetMyLessons.runAsync();
      },
      onError: (err: any) => {
        console.error("Lỗi xoá bài học:", err);
      },
    }
  );

  const requestUpdateLesson = useRequest(
    (data: any) => updateLesson(data, userInfo?.token as string),
    {
      manual: true,
      onSuccess: () => {
        requestGetMyLessons.runAsync();
      },
      onError: (err: any) => {
        console.error("Lỗi cập nhật bài học:", err);
      },
    }
  );

  return {
    myLessons,
    requestGetMyLessons,
    requestAssignLesson,
    requestMarkLessonDone,
    requestDeleteLesson,
    requestUpdateLesson,
  };
};
