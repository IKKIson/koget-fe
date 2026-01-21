// src/stories/CardView.stories.ts
import type { Meta, StoryObj } from "@storybook/react";
import { CardView } from "../components/CardView";

const meta: Meta<typeof CardView> = {
  title: "Components/CardView",
  component: CardView,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    map_name: "사토 기야르 (할로윈)",
    creator: "Mcqueen#31259",
    code: "FAD9D",
    category: "숨은물건찾기",
    onDetailClick: () => alert("상세 페이지로 이동합니다."),
  },
};
