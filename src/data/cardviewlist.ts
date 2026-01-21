// src/data/cardlistview.ts

export const CARD_LIST_CONFIG = {
  // 데이터 경로
  // from /public
  JSON_PATHS: {
    CODES: "/workshop_codes.json",
    CREATORS: "/workshop_creators.json",
  },

  // UI 텍스트
  MESSAGES: {
    LOADING: "워크샵 데이터를 불러오는 중...",
    ERROR: "데이터를 불러오는데 실패했습니다.",
    EMPTY: "등록된 워크샵 데이터가 없습니다.",
  },

  // 그리드 레이아웃 설정 (참고용 또는 클래스 네임 관리)
  GRID_STYLE:
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 justify-items-center",
} as const;
