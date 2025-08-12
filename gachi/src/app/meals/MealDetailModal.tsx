// src/components/MealDetailsModal.tsx
"use client";

import React, { useState } from "react";
import styled from "styled-components";

// styled-components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  width: 90%;
  max-width: 800px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const HeaderTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const RemainingTime = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #d32f2f;
`;

const DetailProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

const DetailProductItem = styled.div`
  display: flex;
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  gap: 20px;
`;

const DetailProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

const DetailProductInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const ProductTitle = styled.h4`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ddd;
  border: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
`;

const QuantityValue = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const OrderSummary = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #333;
`;

const TotalPrice = styled(OrderItem)`
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  border-top: 1px dashed #e0e0e0;
  padding-top: 10px;
`;

const OtherInfoSection = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const OtherInfoTitle = styled.h4`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ImageUploadLabel = styled.label`
  font-size: 14px;
  color: #555;
  cursor: pointer;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const UploadedImagePreview = styled.img`
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;

const NoteText = styled.p`
  font-size: 12px;
  color: #888;
  margin-top: 10px;
`;

const ExampleImage = styled.img`
  max-width: 300px;
  height: auto;
  margin-top: 5px;
  border: 1px dashed #4caf50;
  border-radius: 5px;
  padding: 5px;
`;

const JoinButton = styled.button`
  position: absolute;
  right: 40px;
  bottom: 40px;
  padding: 15px 30px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

// TypeScript 인터페이스 정의
interface SubProduct {
  id: number;
  name: string;
  price: number;
  desc: string;
  image: string;
}

interface JointPurchase {
  id: number;
  name: string;
  remainingTime: string;
  subProducts: SubProduct[];
}

interface MealDetailsModalProps {
  onClose: () => void;
  item: JointPurchase;
}

const MealDetailsModal: React.FC<MealDetailsModalProps> = ({
  onClose,
  item,
}) => {
  const [quantities, setQuantities] = useState<Record<number, number>>(() => {
    return item.subProducts.reduce<Record<number, number>>((acc, sub) => {
      acc[sub.id] = 1;
      return acc;
    }, {});
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleQuantityChange = (productId: number, change: number) => {
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[productId] || 0) + change;
      if (newQuantity > 0) {
        return {
          ...prevQuantities,
          [productId]: newQuantity,
        };
      }
      return prevQuantities;
    });
  };

  const calculateTotalPrice = (): number => {
    return item.subProducts.reduce((total, sub) => {
      return total + sub.price * (quantities[sub.id] || 0);
    }, 0);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalCloseButton onClick={onClose}>&times;</ModalCloseButton>

        <DetailHeader>
          <HeaderTitle>
            {item.name} / 남은 시간:{" "}
            <RemainingTime>{item.remainingTime}</RemainingTime>
          </HeaderTitle>
        </DetailHeader>

        <DetailProductList>
          {item.subProducts.map((subProduct) => (
            <DetailProductItem key={subProduct.id}>
              <DetailProductImage
                src={subProduct.image}
                alt={subProduct.name}
              />
              <DetailProductInfo>
                <ProductTitle>{subProduct.name}</ProductTitle>
                <ProductDescription>{subProduct.desc}</ProductDescription>
                <ProductPrice>
                  가격: {subProduct.price.toLocaleString()}원
                </ProductPrice>
                <QuantityControl>
                  수량 선택
                  <QuantityButton
                    onClick={() => handleQuantityChange(subProduct.id, -1)}
                  >
                    -
                  </QuantityButton>
                  <QuantityValue>{quantities[subProduct.id]}</QuantityValue>
                  <QuantityButton
                    onClick={() => handleQuantityChange(subProduct.id, 1)}
                  >
                    +
                  </QuantityButton>
                </QuantityControl>
              </DetailProductInfo>
            </DetailProductItem>
          ))}
        </DetailProductList>

        <OrderSummary>
          {item.subProducts.map((subProduct) => (
            <OrderItem key={subProduct.id}>
              <span>{subProduct.name}</span>
              <span>{subProduct.price.toLocaleString()}원</span>
              <span>{quantities[subProduct.id]}개</span>
            </OrderItem>
          ))}
          <TotalPrice>
            <span>총 주문 금액:</span>
            <span>{calculateTotalPrice().toLocaleString()}원</span>
          </TotalPrice>
        </OrderSummary>

        <OtherInfoSection>
          <OtherInfoTitle>기타:</OtherInfoTitle>
          <ImageUploadContainer>
            <ImageUploadLabel htmlFor="other-image">
              사진 업로드
              <input
                type="file"
                id="other-image"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </ImageUploadLabel>
            {uploadedImage && (
              <UploadedImagePreview src={uploadedImage} alt="업로드된 이미지" />
            )}
            <NoteText>
              예시 이미지와 같이 메뉴 이름, 옵션, 가격이 모두 보이도록 사진을
              캡쳐해주세요.
            </NoteText>
            <ExampleImage src="/ExampleImage.jpg" alt="예시 이미지" />
          </ImageUploadContainer>
        </OtherInfoSection>

        <JoinButton>공동구매 참여하기</JoinButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MealDetailsModal;
