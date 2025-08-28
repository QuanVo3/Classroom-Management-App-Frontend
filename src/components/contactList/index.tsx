/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FC, useState } from "react";

interface ContactListProps {
  users: { id: string; name: string; email: string }[];
  selectedId: string | null;
  onSelect: (user: any) => void;
  title?: string; // Cho phép tuỳ chỉnh tiêu đề
}

const ContactList: FC<ContactListProps> = ({
  users,
  selectedId,
  onSelect,
  title = "Danh sách liên hệ",
}) => {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-blue-50 to-white border-r">
      {/* Header */}
      <div className="p-4 border-b flex-shrink-0">
        <h2 className="text-lg font-bold text-blue-700">💬 {title}</h2>
      </div>

      {/* Search */}
      <div className="p-3 border-b flex-shrink-0">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm..."
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm 
            focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {/* List */}
      <ul className="flex-1 overflow-y-auto">
        {filteredUsers.map((u) => (
          <li
            key={u.id}
            onClick={() => onSelect(u)}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-150
              ${
                selectedId === u.id
                  ? "bg-blue-100 shadow-inner"
                  : "hover:bg-blue-50"
              }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold
                ${selectedId === u.id ? "bg-blue-500" : "bg-gray-400"}`}
            >
              {u.name?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-800 truncate">{u.name}</div>
              <div className="text-xs text-gray-500 truncate">{u.email}</div>
            </div>
          </li>
        ))}
        {filteredUsers.length === 0 && (
          <li className="p-4 text-gray-400 italic">Không tìm thấy kết quả</li>
        )}
      </ul>
    </div>
  );
};

export default ContactList;
