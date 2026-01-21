// src/data/const.ts

//public/...json...
export const WORKSHOP_RESOURCE_CONST = {
  // public/
  WORKSHOP_CODES_JSON_PATH: "/workshop_codes.json",
  // public/
  WORKSHOP_CREATORS_JSON_PATH: "/workshop_creators.json",
};

//src/app/layout.tsx
export const LAYOUT_CONST = {
  META_DATA_TITLE: "KoGet",
  META_DATA_DISCRIPTION: "Korean Overwatch Workshop Codes Get It",
} as const;

//src/app/page.tsx
export const HOME_PAGE_RESOURCE_CONST = {
  DOWNLOAD_ALL_CODES_JSON_FILE: "koget_code_all.json",
} as const;

//src/app/page.tsx
export const HOME_PAGE_MESSAGE_CONST = {
  DOWNLOAD_ERROR_FILE_RESPONSE_FAIL: "파일을 불러올 수 없습니다.",
  DOWNLOAD_ERROR_DATA_LOAD_FAIL: "데이터를 불러오는 중 오류가 발생했습니다.",
} as const;

//src/app/page.tsx
export const HOME_PAGE_CONTENT_CONST = {
  TOP_CONTAINER_TITLE: "KoGet!",
  TOP_CONTAINER_SUBTITLE: "Korean Overwatch Workshop Codes Get It",
  TOP_CONTAINER_DESCRIPTION_01:
    "한국인 제작자들의 워크샵 코드를 쉽고 간편하게 찾는 웹어플리케이션입니다.",
  TOP_CONTAINER_DESCRIPTION_02:
    "워크샵 코드를 클릭하면 클립보드에 자동을 복사되며, 검색챙에 제작자명 / 맵이름 / 코드 / 카테고리로 검색하여 원하는 코드들을 찾아보세요.",
  SEARCH_INPUT: "제작자, 맵 이름, 코드, 카테고리로 검색하세요...",
  JSON_ALL_DOWNLOAD_BUTTON: "Json All",
  DETAIL_ALL_CLOSE_BUTTON: "모두닫기",
  DETAIL_ALL_OPEN_BUTTON: "모두보기",
} as const;

//src/app/creator/page.tsx
export const CREATOR_PAGE_CONST = {
  NAV_TITLE: "Creator",
  NAV_DESCRIPTION: "제작자 소개",
  TITLE: "WORKSHOP CREATORS",
  THANK_YOU_TITLE: "맵 제작자분들께 감사드립니다",
  THANK_YOU_DESCRIPTION:
    "풍성한 오버워치 워크샵 생태계를 위해 힘써주시는 모든 제작자분들의 노고에 진심으로 감사드립니다. 여러분의 창의적인 맵들 덕분에 많은 플레이어들이 즐거운 시간을 보내고 있습니다.",
} as const;
