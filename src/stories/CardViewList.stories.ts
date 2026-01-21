// src/stories/CardViewList.stories.ts
import type { Meta, StoryObj } from "@storybook/react";
import { CardViewList } from "../components/CardViewList";

const meta: Meta<typeof CardViewList> = {
  title: "Components/CardViewList",
  component: CardViewList,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 테스트용 목업 데이터
const mockMaps = [
  {
    creator: "Mcqueen#31259",
    map_name: "사토 기야르 (할로윈)",
    code: "FAD9D",
    category: "숨은물건찾기",
  },
  {
    creator: "User1#1234",
    map_name: "왕의 길 점령",
    code: "KING1",
    category: "데스매치",
  },
  {
    creator: "User2#5678",
    map_name: "하나무라 수비",
    code: "HANA2",
    category: "연습용",
  },
  {
    creator: "User3#9999",
    map_name: "리장 타워 야시장",
    code: "LIJ33",
    category: "기타",
  },
  {
    creator: "Mcqueen#31259",
    map_name: "워크샵 테스트 맵",
    code: "TEST1",
    category: "숨은물건찾기",
  },
  {
    creator: "Mcqueen#31259",
    map_name:
      "긴 제목의 맵 이름 테스트입니다. 두 줄까지 표시되는지 확인하세요.",
    code: "LONG1",
    category: "테스트",
  },
];

export const Default: Story = {
  args: {
    maps: mockMaps,
    onDetailClick: (code) => console.log(`${code} 상세페이지 이동`),
  },
};
