// src/stories/Footer.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "@/components/Footer";

const meta: Meta<typeof Footer> = {
  title: "Components/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="bg-background min-h-[300px] flex flex-col justify-end">
      <Footer />
    </div>
  ),
};
