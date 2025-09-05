/* eslint-disable @typescript-eslint/no-explicit-any */
import { Axios } from ".";
import { PATH } from "./path";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const assignLesson = async (data: any, token: string) => {
  const URL = PATH.assign_lesson;
  return await Axios.post(URL, data, { baseURL: BASE_URL, token });
};

export const getMyLessons = async (token: string) => {
  const URL = PATH.get_my_lessons;
  return await Axios.get(URL, undefined, { baseURL: BASE_URL, token });
};

export const markLessonDone = async (lessonId: string, token: string) => {
  const URL = PATH.mark_lesson_done;
  return await Axios.post(URL, { lessonId }, { baseURL: BASE_URL, token });
};

export const deleteLesson = async (lessonId: string, token: string) => {
  const URL = PATH.delete_lesson;
  return await Axios.remove(
    URL,
    { id: lessonId },
    { baseURL: BASE_URL, token }
  );
};

export const updateLesson = async (data: string, token: string) => {
  const URL = PATH.update_lesson;
  return await Axios.put(URL, data, { baseURL: BASE_URL, token });
};
