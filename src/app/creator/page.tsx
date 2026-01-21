// src/app/creator/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CREATOR_PAGE_CONST, WORKSHOP_RESOURCE_CONST } from "@/data/const";

interface CreatorMap {
  datetime: string;
  link: string;
  category: string;
  description: string;
}

interface Creator {
  category: string;
  creator: string;
  description?: string;
  maps: CreatorMap[];
}

export default function CreatorPage() {
  const [creators, setCreators] = useState<Creator[]>([]);

  useEffect(() => {
    fetch(WORKSHOP_RESOURCE_CONST.WORKSHOP_CREATORS_JSON_PATH)
      .then((res) => res.json())
      .then((data) => setCreators(data.creators))
      .catch((err) =>
        console.error("제작자 데이터를 불러오는데 실패했습니다.", err),
      );
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow flex flex-col items-center py-16 px-8">
        {/* Container 1: 감사 문구 */}
        <section className="max-w-[1000px] w-full text-center mb-20">
          <h1 className="text-4xl font-black text-brand mb-6 tracking-tighter">
            {CREATOR_PAGE_CONST.THANK_YOU_TITLE}
          </h1>
          <p className="text-lg text-white/70 leading-relaxed font-medium break-keep">
            {CREATOR_PAGE_CONST.THANK_YOU_DESCRIPTION}
          </p>
        </section>

        {/* Container 2: 제작자 리스트 */}
        <section className="max-w-[1000px] w-full flex flex-col gap-6">
          {creators.map((c, idx) => (
            <div
              key={`${c.creator}-${idx}`}
              className="bg-black/40 border border-white/10 rounded-2xl p-8 hover:border-brand/50 transition-all shadow-2xl group"
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* 제작자 기본 정보 영역 */}
                <div className="md:w-1/3 shrink-0">
                  <span className="text-[10px] font-black text-brand bg-brand/10 px-2 py-1 rounded uppercase mb-2 inline-block">
                    {c.category}
                  </span>
                  <h2 className="text-3xl font-black text-white mb-2 group-hover:text-brand transition-colors">
                    {c.creator}
                  </h2>
                  {c.description && (
                    <p className="text-sm text-white/40 font-bold leading-snug break-keep">
                      {c.description}
                    </p>
                  )}
                </div>

                {/* 맵 리스트 영역 */}
                <div className="md:w-2/3">
                  <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.2em] mb-4 border-b border-white/5 pb-2">
                    Recent Workshop Contributions
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {c.maps.map((m, mIdx) => (
                      <a
                        key={mIdx}
                        href={m.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col gap-1 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] font-bold text-brand">
                            {m.category}
                          </span>
                          <span className="text-[10px] text-white/30 font-medium">
                            {m.datetime.split(" ")[0]}
                          </span>
                        </div>
                        <p className="text-[13px] text-white/80 font-bold line-clamp-1">
                          {m.description}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
