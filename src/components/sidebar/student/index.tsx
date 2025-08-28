"use client";
import { FC } from "react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const StudentSidebar: FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: "lessons", title: "📚 Bài học của tôi" },
    { key: "profile", title: "👤 Hồ sơ cá nhân" },
    { key: "chat", title: "💬 Nhắn tin" },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-blue-50 to-white border-r shadow-sm flex flex-col">
      {/* Header */}
      <div className="px-4 py-5 border-b">
        <h2 className="text-xl font-bold text-blue-700">Student Menu</h2>
      </div>

      {/* Menu items */}
      <ul className="flex-1 p-4 space-y-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <li key={tab.key}>
              <button
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-500 text-white shadow"
                      : "text-gray-700 hover:bg-blue-100"
                  }`}
                onClick={() => setActiveTab(tab.key)}
              >
                <span className="truncate font-medium">{tab.title}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
    </div>
  );
};

export default StudentSidebar;
