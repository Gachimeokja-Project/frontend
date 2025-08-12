"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
// Styled Components
const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin-left: 270px;
  font-size: 18px;
`;

const Title = styled.h2`
  margin-bottom: 30px;
  font-size: 26px;
`;

const FormContainer = styled.form`
  margin-top: 10px;
`;

const FormItem = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  color: #555;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const FileInput = styled.input`
  padding: 5px;
  font-size: 16px;
`;

const HelperText = styled.p`
  font-size: 14px;
  color: #777;
  margin-top: 8px;
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  &:hover {
    background-color: #45a049;
  }
`;

const SignUpPage = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [schoolImage, setSchoolImage] = useState<File | null>(null);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nickname || !email || !phoneNumber || !birthDate || !schoolImage) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    // KakaoRedirectHandler에서 저장한 accessToken 불러오기
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    const authImgUrl =
      "https://cdn.donggukmedia.com/news/photo/202103/40504_10264_390.jpg";

    const requestBody = {
      fullName: nickname,
      email,
      phoneNumber,
      birthdate: birthDate,
      authImgUrl,
      nickname,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_LINK}/api/v1/users/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!res.ok) {
        // 응답 본문이 JSON일 수도 아닐 수도 있어서 안전하게 처리
        const text = await res.text();
        let errorMessage = "알 수 없는 오류";

        try {
          const errorData = JSON.parse(text);
          errorMessage = errorData.message || errorMessage;
        } catch {
          // JSON 파싱 실패 시 그냥 텍스트 그대로 사용
          errorMessage = text || errorMessage;
        }

        alert(`회원가입 실패: ${errorMessage}`);
        return;
      }

      const data = await res.json();
      console.log("회원가입 성공:", data);
      alert("회원가입이 완료되었습니다!");
      router.push("/");
    } catch (error) {
      console.error("회원가입 요청 중 오류 발생:", error);
      alert("서버와의 통신 중 문제가 발생했습니다.");
    }
  };

  return (
    <Container>
      <Title>회원 가입</Title>
      <FormContainer onSubmit={handleSubmit}>
        {/* 닉네임 */}
        <FormItem>
          <Label htmlFor="nickname">닉네임</Label>
          <Input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력하세요"
          />
        </FormItem>

        {/* 이메일 */}
        <FormItem>
          <Label htmlFor="email">이메일</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소를 입력하세요"
          />
        </FormItem>

        {/* 전화번호 */}
        <FormItem>
          <Label htmlFor="phoneNumber">전화번호</Label>
          <Input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="-를 빼고 입력해주세요"
          />
          <HelperText>안심번호로 변환하여 입력하는 것을 추천합니다.</HelperText>
        </FormItem>

        {/* 생년월일 */}
        <FormItem>
          <Label htmlFor="birthDate">생년월일</Label>
          <Input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </FormItem>

        {/* 학교 인증 */}
        <FormItem>
          <Label htmlFor="schoolImage">학교 인증 (학생증 사진 업로드)</Label>
          <FileInput
            type="file"
            id="schoolImage"
            accept="image/*"
            onChange={(e) =>
              setSchoolImage(e.target.files ? e.target.files[0] : null)
            }
          />
        </FormItem>

        <Button type="submit">회원가입</Button>
      </FormContainer>
    </Container>
  );
};

export default SignUpPage;
