"use client";
import MypageSidebar from "@/components/MypageSidebar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import MemberInfoContent from "@/components/MemberInfoContent";
import PaymentInfoContent from "./PaymentInfoContent";
import styled from "styled-components";
import ParticipatedContent from "./ParticipateContent";
import EstablishedContent from "./EstablishedContent";

const MainContentWrapper = styled.div`
  display: flex;
`;

export default function Mypage() {
  const [menuItemClick, setMenuItemClick] = useState<string>("");

  return (
    <div>
      <Sidebar />
      <MainContentWrapper>
        <MypageSidebar setMenuItemClick={setMenuItemClick} />
        {(menuItemClick === "memberInfo" || menuItemClick === "") && (
          <MemberInfoContent />
        )}
        {menuItemClick === "paymentInfo" && <PaymentInfoContent />}
        {menuItemClick === "participated" && <ParticipatedContent />}
        {menuItemClick === "established" && <EstablishedContent />}
      </MainContentWrapper>
    </div>
  );
}
