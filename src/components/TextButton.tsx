// src/components/TextButton.tsx

export interface TextButtonProps {
  /** 버튼의 강조 색상 타입 */
  variant?:
    | "brand"
    | "brightBlue"
    | "danger"
    | "gray"
    | "brandCardView"
    | "grayCardView";
  /** 버튼 크기 */
  size?: "small" | "medium" | "large";
  /** 버튼 내용 */
  label: string;
  // 외부 클래스 허용
  className?: string;
  /** 클릭 핸들러 */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const TextButton = ({
  variant = "brand",
  size = "medium",
  label,
  className,
  ...props
}: TextButtonProps) => {
  // 크기별 스타일 정의
  const sizeClasses = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-5 py-2.5 text-base",
    large: "px-8 py-3 text-lg",
  };

  // 변수 색상별 스타일 정의 (global.css에 정의한 테마 변수 사용)
  const variantClasses = {
    brand: "bg-brand hover:opacity-90 text-white",
    brightBlue: "bg-bright-blue hover:opacity-90 text-white",
    danger: "bg-danger hover:opacity-90 text-white",
    gray: "bg-gray hover:opacity-90 text-white",
    brandCardView: "bg-brand hover:opacity-90 text-white w-[236px] h-[48px]",
    grayCardView: "bg-gray hover:opacity-90 text-white w-[236px] h-[48px]",
    brightBlueCardView:
      "bg-brightBlue hover:opacity-90 text-white w-[236px] h-[48px]",
  };

  // CardView용 변형인지 확인
  const isCardViewVariant =
    variant === "brandCardView" || variant === "grayCardView";

  return (
    <button
      type="button"
      className={[
        "rounded-md font-bold transition-all active:scale-95 flex items-center justify-center", // 중앙 정렬 추가
        !isCardViewVariant ? sizeClasses[size] : "", // CardView 변형일 때는 기본 size 무시
        variantClasses[variant],
        className,
      ].join(" ")}
      {...props}
    >
      {label}
    </button>
  );
};
