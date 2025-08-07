"use client";

import React, { useState } from "react";
import styled from "styled-components";

// Styled Components
const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  padding: 20px;
  background-color: #f7fcf3;
  border-right: 1px solid #e0e0e0;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

interface NavItemProps {
  $isActive: boolean;
}

const NavItem = styled.li<NavItemProps>`
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: ${(props) => (props.$isActive ? "bold" : "normal")};
  background-color: ${(props) => (props.$isActive ? "#e6f2e6" : "transparent")};
  &:hover {
    background-color: #e6f2e6;
  }
`;

// MypageSidebar Component
interface MypageSidebarProps {
  setMenuItemClick: (menuItem: string) => void;
}

const MypageSidebar: React.FC<MypageSidebarProps> = ({ setMenuItemClick }) => {
  const [activeItem, setActiveItem] = useState("memberInfo");

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    setMenuItemClick(item);
  };

  return (
    <SidebarContainer>
      <SectionTitle>내 정보</SectionTitle>
      <NavList>
        <NavItem
          $isActive={activeItem === "memberInfo"}
          onClick={() => handleItemClick("memberInfo")}
        >
          회원 정보
        </NavItem>
        <NavItem
          $isActive={activeItem === "paymentInfo"}
          onClick={() => handleItemClick("paymentInfo")}
        >
          결제 정보 관리
        </NavItem>
      </NavList>

      <SectionTitle>공구 관리</SectionTitle>
      <NavList>
        <NavItem
          $isActive={activeItem === "participated"}
          onClick={() => handleItemClick("participated")}
        >
          참여한 공구
        </NavItem>
        <NavItem
          $isActive={activeItem === "established"}
          onClick={() => handleItemClick("established")}
        >
          개설한 공구
        </NavItem>
      </NavList>
    </SidebarContainer>
  );
};

export default MypageSidebar;
