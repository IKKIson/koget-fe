// src/stories/Button.stories.ts
import type { Meta, StoryObj } from "@storybook/react";
import { TextButton } from "@/components/TextButton";
import "@/app/globals.css";

const meta: Meta<typeof TextButton> = {
  title: "Components/TextButton",
  component: TextButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["brand", "brightBlue", "danger", "gray"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "brand",
    label: "복사하기",
  },
};

export const JsonCodeInfo: Story = {
  args: {
    variant: "gray",
    size: "small",
    label: "JsonCodeInfo",
  },
};

export const JsonAllInfo: Story = {
  args: {
    variant: "gray",
    size: "small",
    label: "JsonAllInfo",
  },
};

export const Report: Story = {
  args: {
    variant: "danger",
    label: "신고하기",
  },
};
