// src/components/CardView.tsx
"use client";

import { useState, useEffect } from "react";
import { TextButton } from "./TextButton";
import { CreatorModal } from "./CreatorModal";

interface CardViewProps {
  map_name: string;
  creator: string;
  code: string;
  category: string;
  [key: string]: any;
}

export const CardView = ({
  map_name,
  creator,
  code,
  category,
  ...extraProps
}: CardViewProps) => {
  const [showToast, setShowToast] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creatorDetail, setCreatorDetail] = useState<any>(null);

  // 전체 제어 이벤트를 수신하는 Effect 추가
  useEffect(() => {
    const handleExpandAll = (e: any) => {
      setIsExpanded(e.detail.expand);
    };

    window.addEventListener("toggle-all-cards", handleExpandAll);
    return () =>
      window.removeEventListener("toggle-all-cards", handleExpandAll);
  }, []);

  // JSON 다운로드 핸들러
  const handleDownloadJson = (e: React.MouseEvent) => {
    e.stopPropagation();

    // 현재 맵의 모든 정보를 담은 객체 생성
    const mapData = {
      map_name,
      creator,
      code,
      category,
      ...extraProps,
    };

    const jsonString = JSON.stringify(mapData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `koget_${code}.json`; // 파일명 설정
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      console.error("복사 실패:", err);
    }
  };

  // 제작자 이름 클릭 시 workshop_creators.json에서 정보를 찾아 모달을 띄우는 함수
  const handleCreatorClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch("/workshop_creators.json");

      // JSON인지 먼저 확인 (HTML이 오면 여기서 걸러짐)
      const contentType = response.headers.get("content-type");
      if (
        !response.ok ||
        !contentType ||
        !contentType.includes("application/json")
      ) {
        console.error(
          "데이터를 찾을 수 없거나 올바른 형식이 아닙니다. (404 혹은 경로 오류)",
        );
        return;
      }

      const data = await response.json();
      const info = data.creators.find((c: any) => c.creator === creator);

      if (info) {
        setCreatorDetail(info);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("제작자 데이터 로드 실패:", error);
    }
  };

  const detailEntries = Object.entries(extraProps).filter(([key, value]) => {
    const skipKeys = ["onDetailClick", "screenshot_path"];
    if (skipKeys.includes(key)) return false;
    if (value === null || value === undefined) return false;
    if (value === "" || (Array.isArray(value) && value.length === 0))
      return false;
    if (typeof value === "boolean" && value === false) return false;
    return true;
  });

  const renderFormattedValue = (value: any): React.ReactNode => {
    if (value === null || value === undefined) return null;

    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          {value.map((v, i) => (
            <div key={i} className="flex items-center">
              {renderFormattedValue(v)}
              {i < value.length - 1 && (
                <span className="text-white/30 ml-1 text-[10px]">,</span>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === "object") {
      return (
        <div className="ml-1 my-1.5 pl-3 border-l-2 border-brand/30 flex flex-col gap-1.5 bg-white/5 p-2 rounded-r-md">
          {Object.entries(value).map(([k, v]) => (
            <div key={k} className="flex flex-col gap-0.5 text-[11px]">
              <span className="text-cyan font-bold shrink-0 opacity-90">
                {k}
              </span>
              <div className="text-white/80 break-all pl-1 border-l border-white/10">
                {renderFormattedValue(v)}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return <span className="font-medium">{String(value)}</span>;
  };

  return (
    <>
      <div
        className={`relative bg-background border-2 border-gray rounded-xl overflow-hidden shadow-lg flex flex-col shrink-0 transition-all duration-300 ease-in-out`}
        style={{
          width: "252px",
          height: isExpanded ? "auto" : "300px",
          minWidth: "252px",
          minHeight: "300px",
        }}
      >
        {showToast && (
          <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[9999] bg-dark-blue text-white text-xs font-black px-6 py-3 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] animate-bounce border-2 border-white/20 flex items-center gap-2">
            [{code}] CODE COPIED!
          </div>
        )}

        <div className="p-5 flex flex-col h-full gap-4 items-center">
          <div className="h-[18px] w-full flex items-center justify-center text-[18px] font-bold text-cyan tracking-widest uppercase text-center py-1">
            {category}
          </div>

          <div className="h-[48px] w-full flex flex-col gap-2 items-center justify-center text-center">
            <h3 className="text-[18px] font-black text-white leading-tight flex items-center justify-center line-clamp-2 overflow-hidden px-2">
              {map_name}
            </h3>
            {/* 제작자 텍스트 클릭 시 모달 핸들러 연결 */}
            <p
              className="text-xs text-bright-blue font-bold truncate w-full cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleCreatorClick}
            >
              BY{" "}
              <span className="text-white underline underline-offset-2">
                {creator}
              </span>
            </p>
          </div>

          <div className="flex flex-col w-[210px] gap-2 shrink-0 pb-2">
            <div
              onClick={handleCopyCode}
              className="bg-bright-blue h-[48px] flex items-center justify-center rounded-md cursor-pointer border border-transparent hover:border-brand/50 transition-all shadow-inner shrink-0"
            >
              <span className="text-[24px] font-black text-white tracking-widest">
                {code}
              </span>
            </div>

            <TextButton
              label="Json"
              variant="grayCardView"
              className="text-[18px] w-full"
              onClick={handleDownloadJson}
            />

            <TextButton
              label={isExpanded ? "상세닫기" : "상세보기"}
              variant="brandCardView"
              className="text-[18px] w-full"
              onClick={() => setIsExpanded(!isExpanded)}
            />

            {isExpanded && (
              <div className="mt-2 p-3 bg-black/40 rounded-lg border border-gray/60 flex flex-col gap-4 animate-fadeIn max-h-[380px] overflow-y-auto custom-scrollbar">
                {detailEntries.length > 0 ? (
                  detailEntries.map(([key, value]) => (
                    <div
                      key={key}
                      className="flex flex-col border-b border-white/5 pb-3 last:border-0 last:pb-0"
                    >
                      <div className="inline-flex mb-1.5">
                        <span className="text-[9px] bg-brand/20 text-brand px-2 py-0.5 rounded font-black uppercase tracking-widest">
                          {key}
                        </span>
                      </div>
                      <div className="text-[12px] text-white/90 leading-relaxed px-1">
                        {renderFormattedValue(value)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 flex flex-col items-center justify-center opacity-40">
                    <span className="text-[10px] font-bold">NO EXTRA INFO</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 제작자 상세 정보 모달 */}
      <CreatorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        creatorInfo={creatorDetail}
      />
    </>
  );
};
