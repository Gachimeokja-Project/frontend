"use client";

import React, { useState } from "react";
import styled from "styled-components";

// Styled Components
const InfoContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin-left: 270px; /* Adjust to move content next to the sidebar */
`;

const InfoItem = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  width: 120px;
  font-weight: bold;
  color: #555;
`;

const Value = styled.div`
  color: #333;
`;

const FormContainer = styled.form`
  margin-top: 30px;
`;

const FormItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 250px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #45a049;
  }
`;

const ErrorMessage = styled.p`
  color: #d32f2f;
  font-size: 14px;
  margin-top: 5px;
`;

// MemberInfoContent Component
const MemberInfoContent = () => {
  const [nickname, setNickname] = useState("길동");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  // Dummy user data
  const userData = {
    name: "홍길동",
    major: "컴퓨터공학전공",
    studentId: "202412345678",
    email: "dongguk@gmail.com",
    birthdate: "1900.01.01",
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (currentPassword !== newPassword) {
      setPasswordMismatch(true);
      return;
    }
    setPasswordMismatch(false);
    // Handle form submission logic here (e.g., API call to update data)
    console.log("Form submitted:", { nickname, currentPassword, newPassword });
    alert("정보가 성공적으로 업데이트되었습니다.");
  };

  return (
    <InfoContainer>
      <h2>회원 정보</h2>
      <InfoItem>
        <Label>이름 :</Label>
        <Value>{userData.name}</Value>
      </InfoItem>
      <InfoItem>
        <Label>학과 :</Label>
        <Value>{userData.major}</Value>
      </InfoItem>
      <InfoItem>
        <Label>학번 :</Label>
        <Value>{userData.studentId}</Value>
      </InfoItem>
      <InfoItem>
        <Label>email :</Label>
        <Value>{userData.email}</Value>
      </InfoItem>
      <InfoItem>
        <Label>생년월일 :</Label>
        <Value>{userData.birthdate}</Value>
      </InfoItem>

      <FormContainer onSubmit={handleSubmit}>
        <FormItem>
          <Label>닉네임 :</Label>
          <Input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <Label>현재 비밀번호 :</Label>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <Label>비밀번호 확인 :</Label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {passwordMismatch && (
            <ErrorMessage>비밀번호가 일치하지 않습니다!</ErrorMessage>
          )}
        </FormItem>
        <Button type="submit">저장</Button>
      </FormContainer>
    </InfoContainer>
  );
};

export default MemberInfoContent;
