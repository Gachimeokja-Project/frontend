"use client";
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

// Styled Components
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-right: 20px;
`;

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 5px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const HomeStyledButton = styled(StyledButton)`
  font-weight: 700;
  font-size: 20px;
`;

const MemberButtonContainer = styled.div`
  position: relative;
  border: 1px solid #cccccc;
  border-radius: 5px;
  background-color: #ffffff;
`;

const MemberButtonText = styled.div`
  padding: 8px 15px;
  cursor: pointer;
  font-weight: bold;
`;

// Interfaces
interface ButtonProps {
  text: string;
  onClick: () => void;
}

interface MemberButtonProps {
  memberName: string;
}

// Components
const HomeButton: React.FC<ButtonProps> = ({ text, onClick }) => {
  return <HomeStyledButton onClick={onClick}>{text}</HomeStyledButton>;
};

const RouterButton: React.FC<ButtonProps> = ({ text, onClick }) => {
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
};

const MemberButton: React.FC<MemberButtonProps> = ({ memberName }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();
  const handleMypagelick = () => {
    router.push("/mypage");
  };
  return (
    <MemberButtonContainer>
      <MemberButtonText onClick={toggleDropdown}>{memberName}</MemberButtonText>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "100%",
            marginTop: "5px",
            width: "120px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "5px",
            zIndex: 10,
          }}
        >
          <StyledButton onClick={handleMypagelick}>마이페이지</StyledButton>
          <StyledButton>로그아웃</StyledButton>
        </div>
      )}
    </MemberButtonContainer>
  );
};

const Sidebar: React.FC = () => {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
  };

  const handleMealClick = () => {
    router.push("/meals");
  };

  const handleItemClick = () => {
    router.push("/items");
  };

  const handleMypagelick = () => {
    router.push("/mypage");
  };

  return (
    <HeaderContainer>
      <HomeButton text="같이 먹자" onClick={handleHomeClick} />
      <ButtonGroup>
        <RouterButton text="식사 공구" onClick={handleMealClick} />
        <RouterButton text="물품 공구" onClick={handleItemClick} />
        <MemberButton memberName="김도현 님" />
      </ButtonGroup>
    </HeaderContainer>
  );
};

export default Sidebar;
