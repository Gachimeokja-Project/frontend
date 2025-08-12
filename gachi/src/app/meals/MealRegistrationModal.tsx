// src/components/MealRegistrationModal.tsx
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

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  resize: vertical;
  min-height: 100px;
  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  &:focus {
    border-color: #4caf50;
    outline: none;
  }
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
  max-width: 300px; /* 예시 이미지 크기 조절 */
  height: auto;
  margin-top: 5px;
  border: 1px dashed #4caf50;
  border-radius: 5px;
  padding: 5px;
`;

const SubmitButton = styled.button`
  padding: 15px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #45a049;
  }
`;

interface MealRegistrationModalProps {
  onClose: () => void;
}

const MealRegistrationModal: React.FC<MealRegistrationModalProps> = ({
  onClose,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    discount: "",
    targetCount: "",
  });

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Uploaded Image:", uploadedImage);
    // 여기에 데이터 전송 로직 추가
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalCloseButton onClick={onClose}>&times;</ModalCloseButton>
        <ModalTitle>공동구매 등록하기</ModalTitle>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">상품명</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="category">카테고리</Label>
            <Select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">카테고리 선택</option>
              <option value="meal">식사</option>
              <option value="fresh">신선식품</option>
              <option value="general">일반식품</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description">상세 설명</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="price">원가 (₩)</Label>
            <Input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="discount">할인율 (%)</Label>
            <Input
              type="number"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="targetCount">공동구매 목표 인원</Label>
            <Input
              type="number"
              id="targetCount"
              name="targetCount"
              value={formData.targetCount}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>상품 이미지</Label>
            <ImageUploadContainer>
              <ImageUploadLabel htmlFor="product-image">
                사진 업로드
                <input
                  type="file"
                  id="product-image"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </ImageUploadLabel>
              {uploadedImage && (
                <UploadedImagePreview
                  src={uploadedImage}
                  alt="업로드된 상품 이미지"
                />
              )}
              <NoteText>
                예시 이미지와 같이 메뉴 이름, 옵션, 가격이 모두 보이도록 사진을
                캡쳐해주세요.
              </NoteText>
              {/* 예시 이미지 */}
              <ExampleImage src="/ExampleImage.jpg" alt="예시 이미지" />
            </ImageUploadContainer>
          </FormGroup>

          <SubmitButton type="submit">등록하기</SubmitButton>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MealRegistrationModal;
