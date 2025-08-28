"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/src/hooks/auth";
import StudentSidebar from "@/src/components/sidebar/student";
import MyLesson from "@/src/components/myLesson";
import MyProfile from "@/src/components/myProfile";
import ChatBox from "@/src/components/chatBox";
import ContactList from "@/src/components/contactList";
import { useLesson } from "@/src/hooks/lesson";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("lessons");
  const { userInfo } = useAuth();
  const { requestGetMyLessons } = useLesson();

  const [contacts, setContacts] = useState<any[]>([]);
  const [selectedContact, setSelectedContact] = useState<any>(null);

  useEffect(() => {
    requestGetMyLessons.runAsync().then((res) => {
      if (res?.lessons) {
        const teachersMap = new Map();

        res.lessons.forEach((lesson: any) => {
          if (lesson.lesson?.createdBy) {
            teachersMap.set(lesson.lesson.createdBy, {
              id: lesson.lesson.createdBy,
              // ✅ Lấy đúng tên và email từ backend mới
              name: lesson.teacherName || "Giáo viên",
              email: lesson.teacherEmail || "",
            });
          }
        });

        setContacts(Array.from(teachersMap.values()));
      }
    });
  }, []);

  return (
    <div className="flex min-h-screen">
      <StudentSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1  bg-gray-50">
        {activeTab === "lessons" && <MyLesson />}
        {activeTab === "profile" && <MyProfile />}
        {activeTab === "chat" && (
          <div className="flex border rounded-lg shadow bg-white h-full overflow-hidden w-full">
            {/* Danh sách liên hệ */}
            <div className="w-[260px] flex-shrink-0">
              <ContactList
                users={contacts}
                selectedId={selectedContact?.id || null}
                onSelect={(u) => setSelectedContact(u)}
              />
            </div>

            {/* Khu vực chat */}
            <div className="flex-1 min-w-0">
              {selectedContact ? (
                <ChatBox currentUser={userInfo} peerUser={selectedContact} />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Chọn một liên hệ để bắt đầu trò chuyện
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
