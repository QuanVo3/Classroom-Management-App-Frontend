/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FC } from "react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: any;
}

const Sidebar: FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: "students", title: "👥 Quản lý học sinh" },
    { key: "lessons", title: "📚 Quản lý bài học" },
    { key: "profile", title: "👤 Hồ sơ cá nhân" },
    { key: "chat", title: "💬 Nhắn tin" },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-blue-50 to-white border-r shadow-sm flex flex-col">
      {/* Header */}
      <div className="px-4 py-5 border-b">
        <h2 className="text-xl font-bold text-blue-700">Giáo viên</h2>
      </div>

      {/* Menu items */}
      <ul className="p-4 space-y-2 flex-1">
        {tabs.map((tab) => (
          <li key={tab.key}>
            <button
              className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-blue-500 text-white shadow"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
