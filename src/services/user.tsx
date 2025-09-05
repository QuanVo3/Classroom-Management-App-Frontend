/* eslint-disable @typescript-eslint/no-explicit-any */
import { Axios } from ".";
import { PATH } from "./path";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const addStudent = async (data: any, token: string) => {
  const URL = PATH.add_student;
  return await Axios.post(URL, data, { baseURL: BASE_URL, token });
};

export const deleteStudent = async (id: string, token: string) => {
  const URL = PATH.delete_student;
  return await Axios.remove(
    URL,
    { id: id },
    {
      baseURL: BASE_URL,
      token: token,
    }
  );
};

export const updateUserInfo = async (data: any, token: string) => {
  const URL = PATH.edit_student;
  return await Axios.put(URL, { data: data }, { baseURL: BASE_URL, token });
};

export const assignLesson = async (data: any, token: string) => {
  const URL = PATH.assign_lesson;
  return await Axios.post(URL, data, { baseURL: BASE_URL, token });
};

export const getStudentDetail = async (id: string, token: string) => {
  const URL = `${PATH.get_student}/${id}`;
  return await Axios.get(URL, undefined, { baseURL: BASE_URL, token });
};

export const getAllStudents = async (token: string) => {
  const URL = PATH.get_all_students;
  return await Axios.get(URL, undefined, {
    baseURL: BASE_URL,
    token,
  });
};
