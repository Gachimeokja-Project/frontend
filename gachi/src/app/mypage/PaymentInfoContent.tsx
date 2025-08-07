"use client";

import React, { useState } from "react";
import styled from "styled-components";

// Styled Components
const ContentContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin-left: 270px;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const AccountInfoBox = styled.div`
  border: 1px solid #e0e0e0;
  padding: 15px;
  border-radius: 5px;
  line-height: 1.6;
`;

const AccountInfoText = styled.p`
  margin: 0;
  color: #555;
`;

const UploadButton = styled.label`
  display: inline-block;
  padding: 10px 20px;
  background-color: #e6f2e6;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  &:hover {
    background-color: #d6e8d6;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

// Corrected SaveButton styling
const SaveButton = styled.button`
  width: 150px;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  display: block;
  margin-top: 40px; /* Use margin-top to create space */
  /* Remove auto margin for left alignment */
  &:hover {
    background-color: #45a049;
  }
`;

const PaymentInfoContent = () => {
  const [phoneNumber, setPhoneNumber] = useState("050154654887989456");
  const [kakaoQr, setKakaoQr] = useState(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setKakaoQr(file);
      alert(`${file.name} 파일이 업로드되었습니다.`);
    }
  };

  const handleSave = () => {
    // Logic to save the payment information (e.g., API call)
    console.log("Saving payment info:", { phoneNumber, kakaoQr });
    alert("결제 정보가 성공적으로 저장되었습니다.");
  };

  return (
    <ContentContainer>
      <Section>
        <SectionTitle>안심 전화번호</SectionTitle>
        <InputField
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Section>

      <Section>
        <SectionTitle>결제 계좌 정보</SectionTitle>
        <AccountInfoBox>
          <AccountInfoText>예금주명: 홍길동</AccountInfoText>
          <AccountInfoText>은행: 우리은행</AccountInfoText>
          <AccountInfoText>계좌번호: 123456789</AccountInfoText>
        </AccountInfoBox>
      </Section>

      <Section>
        <SectionTitle>카카오페이/토스페이 송금 QR</SectionTitle>
        <UploadButton htmlFor="qr-upload">
          {kakaoQr ? "QR 사진 변경" : "카카오페이 QR 등록"}
        </UploadButton>
        <HiddenInput
          id="qr-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </Section>

      <Section>
        <SectionTitle>환불 계좌 정보</SectionTitle>
        <AccountInfoBox>
          <AccountInfoText>예금주명: 홍길동</AccountInfoText>
          <AccountInfoText>은행: 우리은행</AccountInfoText>
          <AccountInfoText>계좌번호: 123456789</AccountInfoText>
        </AccountInfoBox>
      </Section>

      <SaveButton onClick={handleSave}>저장</SaveButton>
    </ContentContainer>
  );
};

export default PaymentInfoContent;
