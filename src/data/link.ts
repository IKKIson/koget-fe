// src/data/link.ts

// 테마 색상 정의
export const COMMUNITY_THEMES = {
  OVERWATCH: {
    bg: "#f99e1a",
    main: "#f99e1a",
    title: "#ffffff",
    desc: "#ffffff",
    hover: "#a86909",
  },
  INVEN: {
    bg: "#a73939",
    main: "#a73939",
    title: "#ffffff",
    desc: "#ffffff",
    hover: "#6e1111",
  },
  WORKSHOP: {
    bg: "#3b82f6",
    main: "#3b82f6",
    title: "#ffffff",
    desc: "#ffffff",
    hover: "#21314d",
  },
  FORENCODES: {
    bg: "#000000",
    main: "#e2c20d",
    title: "#e2c20d",
    desc: "#e2c20d",
    hover: "#7b6609",
  },
  IKKISON: {
    bg: "#845ec2",
    main: "#845ec2",
    title: "#ff6f91",
    desc: "#ff9671",
    hover: "#998fcc",
  },
} as const;

// 카드 버튼 데이터 정의
export const COMMUNITY_LINKS = [
  {
    title: "Overwatch2",
    description: "오버워치2 공식 홈페이지",
    href: "https://overwatch.blizzard.com",
    theme: COMMUNITY_THEMES.OVERWATCH,
  },
  {
    title: "Inven",
    description: "오버워치 인벤",
    href: "https://overwatch.inven.co.kr/",
    theme: COMMUNITY_THEMES.INVEN,
  },
  {
    title: "workshop.codes",
    description: "글로벌 워크샵 저장소",
    href: "https://workshop.codes/",
    theme: COMMUNITY_THEMES.WORKSHOP,
  },
  {
    title: "foren.codes",
    description: "제작자 foren님의 워크샵 저장소",
    href: "https://foren.codes/",
    theme: COMMUNITY_THEMES.FORENCODES,
  },
  {
    title: "Developer",
    description: "개발자 홈페이지",
    href: "https://ikkison.github.io/",
    theme: COMMUNITY_THEMES.IKKISON,
  },
];

// public/
export const WORKSHOP_CONFIG = {
  CODE_JSON_PATH: "",
  CODE_JSON_FILE: "workshop_codes.json",
  CREATOR_JSON_PATH: "",
  CREATOR_JSON_FILE: "workshop_creators.json",
} as const;
