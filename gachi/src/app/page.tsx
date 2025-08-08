"use client";

import Sidebar from "@/components/Sidebar";
import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useRouter } from "next/navigation";

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const LandingPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  background-color: #fffff;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  gap: 50px;
  padding-bottom: 20px;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: bold;
  color: #333;
  margin: 0;
  line-height: 1.2;
`;

const Subtitle = styled.h2`
  font-size: 50px;
  font-weight: bold;
  color: #333;
  margin: 0;
  line-height: 1.2;
`;

const StartButton = styled.button`
  padding: 15px 30px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 15px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  width: fit-content;
  &:hover {
    background-color: #45a049;
  }
`;

const RightSection = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LandingImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 50px;
`;

const LandingPage = () => {
  const router = useRouter();

  const handleStartClick = () => {
    const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
    const REDIRECT_URI = "http://localhost:3000/kakao/callback";
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    router.push(kakaoAuthUrl);
  };

  return (
    <MainLayout>
      <GlobalStyle />
      <Sidebar />
      <LandingPageContainer>
        <ContentWrapper>
          <LeftSection>
            <Title>혼자 챙기기 어려울 땐?</Title>
            <Subtitle>같이 먹자!</Subtitle>
            <StartButton onClick={handleStartClick}>시작하기</StartButton>
          </LeftSection>
          <RightSection>
            <LandingImage
              src="/LandingPageImage.png"
              alt="같이 먹자 illustration"
            />
          </RightSection>
        </ContentWrapper>
      </LandingPageContainer>
    </MainLayout>
  );
};

export default LandingPage;
