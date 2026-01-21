// src/stories/Header.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "@/components/Header";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  parameters: {
    // 헤더가 화면 전체 너비를 차지하도록 설정
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="bg-background min-h-[200px]">
      <Header />
    </div>
  ),
};
