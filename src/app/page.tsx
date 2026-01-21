// src/app/page.tsx

"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CardViewList } from "@/components/CardViewList";
import { TextButton } from "@/components/TextButton";
import {
  WORKSHOP_RESOURCE_CONST,
  HOME_PAGE_MESSAGE_CONST,
  HOME_PAGE_CONTENT_CONST,
} from "@/data/const";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAllExpanded, setIsAllExpanded] = useState(false);
  const [resultCount, setResultCount] = useState(0);

  // 검색어가 변경될 때 전체 펼침 상태 초기화 (목록 상태 고려)
  useEffect(() => {
    setIsAllExpanded(false);
  }, [searchTerm]);

  const handleToggleAll = () => {
    const nextState = !isAllExpanded;
    setIsAllExpanded(nextState);

    // 모든 CardView에 상태 변경 신호 발신
    const event = new CustomEvent("toggle-all-cards", {
      detail: { expand: nextState },
    });
    window.dispatchEvent(event);
  };

  // 전체 JSON 다운로드 핸들러
  const handleDownloadAllJson = async () => {
    try {
      const response = await fetch(
        WORKSHOP_RESOURCE_CONST.WORKSHOP_CODES_JSON_PATH,
      );
      if (!response.ok)
        throw new Error(
          HOME_PAGE_MESSAGE_CONST.DOWNLOAD_ERROR_FILE_RESPONSE_FAIL,
        );

      const data = await response.json();

      // maps 데이터만 추출
      const mapsOnly = {
        maps: data.maps || [],
      };

      const jsonString = JSON.stringify(mapsOnly, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "koget_code_all.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(
        HOME_PAGE_MESSAGE_CONST.DOWNLOAD_ERROR_DATA_LOAD_FAIL + " ",
        err,
      );
      alert(HOME_PAGE_MESSAGE_CONST.DOWNLOAD_ERROR_DATA_LOAD_FAIL);
    }
  };

  return (
    // <div className="flex flex-col min-h-screen bg-background text-white">
    <div className="flex flex-col h-screen bg-background text-white overflow-hidden">
      {/* 1. Header: 고정 */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-0">
        {/* 설명 영역: 회색 배경 + 텍스트 */}
        <section className="bg-black/40 w-full py-10 px-8 shrink-0 border-b border-white/5">
          <div className="max-w-[1440px] mx-auto text-center flex flex-col gap-3">
            <h2 className="relative text-7xl font-black text-brand tracking-tighter drop-shadow-2xl">
              {HOME_PAGE_CONTENT_CONST.TOP_CONTAINER_TITLE}
            </h2>
            <h3 className="text-xl font-black text-white tracking-tight">
              {HOME_PAGE_CONTENT_CONST.TOP_CONTAINER_SUBTITLE}
            </h3>
            <p className="text-sm font-medium text-white/80">
              {HOME_PAGE_CONTENT_CONST.TOP_CONTAINER_DESCRIPTION_01}
            </p>
            <p className="text-sm font-medium text-white/80">
              {HOME_PAGE_CONTENT_CONST.TOP_CONTAINER_DESCRIPTION_02}
            </p>
          </div>
        </section>

        {/* 검색 섹션: 검색창 + Json All 버튼 */}
        <section className="w-full py-10 px-8 shrink-0 bg-background border-b border-gray">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-center items-center gap-4">
            {/* 검색결과 개수 표시 (검색창 왼쪽) */}
            <div className="flex items-center gap-3 px-4 border-l-4 border-brand h-12 shrink-0">
              <span className="text-[12px] font-bold text-white uppercase tracking-[0.2em]">
                검색된 맵
              </span>
              <span className="text-3xl font-black text-brand leading-none">
                {resultCount}
              </span>
            </div>
            {/* 검색창 */}
            <div className="max-w-[600px] w-full relative group">
              <input
                type="text"
                placeholder={HOME_PAGE_CONTENT_CONST.SEARCH_INPUT}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/30 border-2 border-brand/20 rounded-full px-8 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-brand transition-all text-base font-bold shadow-xl"
              />
            </div>

            {/* 전체 JSON 다운로드 버튼 */}
            <TextButton
              label={HOME_PAGE_CONTENT_CONST.JSON_ALL_DOWNLOAD_BUTTON}
              variant="gray"
              className="text-base w-[102px] h-[48] shrink-0 shadow-xl" // 너비를 검색창에 맞춰 적절히 조정
              onClick={handleDownloadAllJson}
            />

            {/* 전체 상세정보 버튼 추가 */}
            <TextButton
              label={
                isAllExpanded
                  ? HOME_PAGE_CONTENT_CONST.DETAIL_ALL_CLOSE_BUTTON
                  : HOME_PAGE_CONTENT_CONST.DETAIL_ALL_OPEN_BUTTON
              }
              variant="brand"
              className="text-base w-[102px] h-[48] shrink-0 shadow-xl"
              onClick={handleToggleAll}
            />
          </div>
        </section>

        {/* 3. body - CardViewList Area: 스크롤 영역 */}
        <section className="flex-1 overflow-y-auto bg-black/40 min-h-0">
          <div className="max-w-[1440px] mx-auto p-10">
            <CardViewList
              searchTerm={searchTerm}
              onCountChange={setResultCount}
            />
          </div>
        </section>
      </main>

      {/* 4. Footer: 고정 */}
      <Footer />
    </div>
  );
}
