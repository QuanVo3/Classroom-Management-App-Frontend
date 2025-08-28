/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/src/components/sidebar/instructor";
import ManageStudents from "@/src/components/manageStudent";
import ManageLessons from "@/src/components/manageLesson";
import ContactList from "@/src/components/contactList";
import ChatBox from "@/src/components/chatBox";
// 🔹 Hook giả sử có sẵn
import { useStudent } from "@/src/hooks/student";
import { useAuth } from "@/src/hooks/auth";
import { useUser } from "@/src/hooks/user";
import MyProfile from "@/src/components/myProfile";

export default function InstructorPage() {
  const [activeTab, setActiveTab] = useState("students");
  const { userInfo } = useAuth();
  const { requestGetAllStudents } = useUser();

  const [contacts, setContacts] = useState<any[]>([]);
  const [selectedContact, setSelectedContact] = useState<any>(null);

  // Lấy danh sách học sinh để chat
  useEffect(() => {
    if (activeTab === "chat") {
      requestGetAllStudents.runAsync().then((res) => {
        if (res?.students) {
          const mapped = res.students.map((s: any) => ({
            id: s.id,
            name: s.name,
            email: s.email || "",
          }));
          setContacts(mapped);
        }
      });
    }
  }, [activeTab]);

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-6">
        {activeTab === "students" && <ManageStudents />}
        {activeTab === "lessons" && <ManageLessons />}
        {activeTab === "profile" && <MyProfile />}
        {activeTab === "chat" && (
          <div className="flex border rounded-lg shadow bg-white h-full overflow-hidden w-full">
            {/* Danh sách học sinh */}
            <div className="w-[260px] flex-shrink-0">
              <ContactList
                users={contacts}
                selectedId={selectedContact?.id || null}
                onSelect={(u) => setSelectedContact(u)}
                title="Học sinh"
              />
            </div>

            {/* Khu vực chat */}
            <div className="flex-1 min-w-0">
              {selectedContact ? (
                <ChatBox currentUser={userInfo} peerUser={selectedContact} />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Chọn một học sinh để bắt đầu trò chuyện
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
