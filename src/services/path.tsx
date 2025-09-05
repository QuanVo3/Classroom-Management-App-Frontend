export const PATH = {
  login: "/api/auth/verify-code", // xác thực OTP
  send_otp: "/api/auth/createAccessCode", // gửi mã OTP
  login_with_refresh_token: "/api/auth/refresh-token", // đăng nhập với refresh token

  // User management
  add_student: "/api/users/addStudent",
  edit_student: "/api/users/editStudent",
  edit_profile: "/api/users/editProfile",
  delete_student: "/api/users/delete",
  verify_email: "/api/users/verifyEmail", // hoặc /api/auth/verifyEmail/:token
  get_student: "/api/users/getStudent", // cần thêm /:id khi gọi
  get_all_students: "/api/users/getAllStudents",

  // Lesson management
  assign_lesson: "/api/lesson/assignLesson",
  get_my_lessons: "/api/lesson/myLessons",
  mark_lesson_done: "/api/lesson/markLessonDone",
  delete_lesson: "/api/lesson/deleteLesson",
  update_lesson: "/api/lesson/updateLesson",

 
  get_messages: "/api/chat/messages", 


};
