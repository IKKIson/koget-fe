// src/stories/CardViewList.stories.ts
import type { Meta, StoryObj } from "@storybook/react";
import { CardViewList } from "@/components/CardViewList";

const meta: Meta<typeof CardViewList> = {
  title: "Components/CardViewList",
  component: CardViewList,
  parameters: {
    layout: "fullscreen",
    // 만약 MSW를 설정하셨다면 여기서 mock 데이터를 정의할 수 있습니다.
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 상태 스토리
export const Default: Story = {
  args: {
    searchTerm: "",
    // 컴포넌트 내부에서 onCountChange를 호출하므로 모킹 함수를 전달합니다.
    onCountChange: (count: number) => console.log(`검색 결과 개수: ${count}`),
  },
};

// 검색어가 입력된 상태 스토리
export const Searching: Story = {
  args: {
    searchTerm: "사토",
    onCountChange: (count: number) => console.log(`검색 결과 개수: ${count}`),
  },
};
