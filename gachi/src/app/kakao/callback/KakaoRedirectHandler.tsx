"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const Message = styled.p`
  font-size: 1rem;
  color: #666;
`;

const KakaoRedirectHandler = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const API_LINK = process.env.NEXT_PUBLIC_API_LINK;

    if (code) {
      console.log("카카오로부터 받은 인가 코드:", code);

      const backendApiUrl = `${API_LINK}/api/v1/auth/kakao/callback`;

      axios
        .post(backendApiUrl, { code })
        .then((response) => {
          console.log("백엔드로부터 로그인 성공 응답:", response.data);

          const { accessToken, refreshToken } = response.data;

          localStorage.setItem("accessToken", accessToken);

          if (refreshToken) {
            router.push("/");
          } else {
            router.push("/signup");
          }
        })
        .catch((error) => {
          console.error("백엔드 통신 중 에러 발생:", error);
          alert("로그인에 실패했습니다.");
          router.push("/");
        });
    } else {
      console.error("URL에서 인가 코드를 찾을 수 없습니다.");
      alert("카카오 로그인에 실패했습니다.");
      router.push("/");
    }
  }, [searchParams, router]);

  return (
    <Container>
      <Title>카카오 로그인 처리 중... 🚀</Title>
      <Message>잠시만 기다려 주세요.</Message>
    </Container>
  );
};

export default KakaoRedirectHandler;
