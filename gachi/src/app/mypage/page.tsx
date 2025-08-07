"use client";
import MypageSidebar from "@/components/MypageSidebar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function Mypage() {
  const [menuItemClick, setMenuItemClick] = useState<string>();
  return (
    <div>
      <Sidebar />
      <MypageSidebar setMenuItemClick={setMenuItemClick} />
      <div>my page</div>
    </div>
  );
}
