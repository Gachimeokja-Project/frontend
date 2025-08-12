// src/components/MealContent.tsx
"use client";

import React, { useState } from "react";
import styled from "styled-components";
import MealDetailsModal from "./MealDetailModal";

// styled-components
const ContentWrapper = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: #f7fcf3;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
`;

interface TabProps {
  $isActive: boolean;
}

const Tab = styled.div<TabProps>`
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  color: ${(props) => (props.$isActive ? "#4CAF50" : "#888")};
  border-bottom: ${(props) => (props.$isActive ? "2px solid #4CAF50" : "none")};
`;

const JointPurchaseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const JointPurchaseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ProductName = styled.h4`
  font-size: 16px;
  margin: 0;
  font-weight: bold;
`;

interface StatusTagProps {
  $status: string;
}

const StatusTag = styled.span<StatusTagProps>`
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  background-color: ${(props) => {
    switch (props.$status) {
      case "거래중":
        return "#548842";
      case "거래 완료":
        return "#99b895";
      case "거래 실패":
        return "#777";
      default:
        return "#ccc";
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemStat = styled.div`
  text-align: center;
`;

const StatLabel = styled.p`
  font-size: 14px;
  color: #888;
  margin: 0 0 5px 0;
`;

const StatValue = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const PriceBox = styled.div`
  padding: 10px 20px;
  background-color: #fff0f0;
  border: 1px solid #d32f2f;
  border-radius: 5px;
  text-align: center;
`;

const OriginalPrice = styled.s`
  font-size: 14px;
  color: #888;
`;

const DiscountedPrice = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #d32f2f;
`;

const ActionButton = styled.button`
  padding: 12px 20px;
  background-color: #005d45;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  color: #ffffff;
  &:hover {
    background-color: #004836;
  }
`;

const Datetime = styled.p`
  font-size: 12px;
  color: #888;
  margin: 0;
`;

const ProductImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
`;

const ProductImageTag = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 데이터 타입 정의
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
  status: string;
  remainingTime: string;
  progress: string;
  discount: string;
  originalPrice: string;
  discountedPrice: string;
  date: string;
  image: string;
  category: string;
  subProducts: SubProduct[];
}

// Dummy data for the list
const dummyJointPurchases: JointPurchase[] = [
  {
    id: 1,
    name: "샐러드 올데이",
    status: "거래중",
    remainingTime: "00:38:12",
    progress: "9/10",
    discount: "50%",
    originalPrice: "₩39,900",
    discountedPrice: "₩19,900",
    date: "2024/12/06",
    image: "/salmon.jpg",
    category: "fresh",
    subProducts: [
      {
        id: 101,
        name: "직화 닭다리살 포케",
        price: 8000,
        desc: "설명 - 중량 200g / 300kcal / 단백질 22.6g",
        image: "/chicken.jpg",
      },
      {
        id: 102,
        name: "곡물밥+연어",
        price: 7000,
        desc: "설명 - 중량 300g / 350kcal / 단백질 23.5g",
        image: "/salmon.jpg",
      },
    ],
  },
  {
    id: 2,
    name: "닭가슴살",
    status: "거래 완료",
    remainingTime: "00:36:12",
    progress: "10/10",
    discount: "50%",
    originalPrice: "₩39,900",
    discountedPrice: "₩19,900",
    date: "2024/12/06",
    image: "/chicken.jpg",
    category: "fresh",
    subProducts: [
      {
        id: 201,
        name: "닭가슴살 1kg",
        price: 15000,
        desc: "설명 - 1kg 대용량",
        image: "/chicken.jpg",
      },
    ],
  },
  {
    id: 3,
    name: "백채김치찌개",
    status: "거래 실패",
    remainingTime: "00:00:00",
    progress: "10/100",
    discount: "50%",
    originalPrice: "₩39,900",
    discountedPrice: "₩19,900",
    date: "2024/12/06",
    image: "/gimchi.jpg",
    category: "meal",
    subProducts: [
      {
        id: 301,
        name: "김치찌개 2인분",
        price: 12000,
        desc: "설명 - 집에서 끓여먹는 김치찌개",
        image: "/gimchi.jpg",
      },
    ],
  },
];

const MealContent = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<JointPurchase | null>(null);

  const handleOpenModal = (item: JointPurchase) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const filterItems = (category: string): JointPurchase[] => {
    if (category === "all") {
      return dummyJointPurchases;
    }
    return dummyJointPurchases.filter((item) => item.category === category);
  };

  const filteredItems = filterItems(activeTab);

  return (
    <ContentWrapper>
      <TabsContainer>
        <Tab
          $isActive={activeTab === "all"}
          onClick={() => setActiveTab("all")}
        >
          전체
        </Tab>
        <Tab
          $isActive={activeTab === "meal"}
          onClick={() => setActiveTab("meal")}
        >
          식사
        </Tab>
        <Tab
          $isActive={activeTab === "fresh"}
          onClick={() => setActiveTab("fresh")}
        >
          신선식품
        </Tab>
        <Tab
          $isActive={activeTab === "general"}
          onClick={() => setActiveTab("general")}
        >
          일반식품
        </Tab>
      </TabsContainer>

      <JointPurchaseList>
        {filteredItems.map((item) => (
          <JointPurchaseItem key={item.id}>
            <ItemInfo>
              <ProductImage>
                <ProductImageTag src={item.image} alt={item.name} />
              </ProductImage>
              <ProductDetails>
                <ProductName>{item.name}</ProductName>
                <StatusTag $status={item.status}>{item.status}</StatusTag>
              </ProductDetails>
            </ItemInfo>

            <ItemStat>
              <StatLabel>남은 시간</StatLabel>
              <StatValue>{item.remainingTime}</StatValue>
            </ItemStat>
            <ItemStat>
              <StatLabel>진행 상황</StatLabel>
              <StatValue>{item.progress}</StatValue>
            </ItemStat>
            <ItemStat>
              <StatLabel>할인율</StatLabel>
              <StatValue>{item.discount}</StatValue>
            </ItemStat>

            <PriceBox>
              <OriginalPrice>{item.originalPrice}</OriginalPrice>
              <br />
              <DiscountedPrice>{item.discountedPrice}</DiscountedPrice>
            </PriceBox>

            <ActionButton onClick={() => handleOpenModal(item)}>
              거래 상세보기
            </ActionButton>
            <Datetime>{item.date} 등록</Datetime>
          </JointPurchaseItem>
        ))}
      </JointPurchaseList>

      {isModalOpen && selectedItem && (
        <MealDetailsModal onClose={handleCloseModal} item={selectedItem} />
      )}
    </ContentWrapper>
  );
};

export default MealContent;
