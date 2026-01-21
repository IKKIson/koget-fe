// src/components/Header.tsx

import Link from "next/link";
import { COMMUNITY_LINKS } from "@/data/link";
import { CREATOR_PAGE_CONST } from "@/data/const";

export const Header = () => {
  return (
    /* 헤더 전체 배경은 --background, 하단 테두리는 --gray */
    <header className="w-full bg-background border-b border-gray shrink-0">
      <div className="max-w-[1440px] mx-auto h-[66px] px-8 flex items-center justify-between">
        {/* 좌측 로고 영역: KoGet! (클릭 시 홈으로 이동) */}
        <div
          onClick={() => (window.location.href = "/")}
          className="cursor-pointer group flex flex-col items-start"
        >
          <h1 className="text-3xl font-black text-brand tracking-tighter leading-none">
            KoGet!
          </h1>
        </div>

        {/* 우측 링크 목록 영역 */}
        <nav>
          <ul className="flex items-center gap-8">
            {/*  */}
            {/* 제작자 페이지 링크 추가 */}
            <li>
              <Link href="/" className="group flex flex-col items-end">
                <span className="link-title text-sm font-black uppercase tracking-tight transition-colors text-brand group-hover:text-white">
                  Home
                </span>
              </Link>
            </li>
            {/* 제작자 페이지 링크 추가 */}
            <li>
              <Link href="/creator" className="group flex flex-col items-end">
                <span className="link-title text-sm font-black uppercase tracking-tight transition-colors text-brand group-hover:text-white">
                  {CREATOR_PAGE_CONST.NAV_TITLE}
                </span>
              </Link>
            </li>
            {COMMUNITY_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-end"
                  /* 마우스 진입 시 hover 색상으로 변경 */
                  onMouseEnter={(e) => {
                    const titleSpan = e.currentTarget.querySelector(
                      ".link-title",
                    ) as HTMLElement;
                    if (titleSpan) titleSpan.style.color = link.theme.hover;
                  }}
                  /* 마우스 이탈 시 다시 기본 색상(main)으로 복구 */
                  onMouseLeave={(e) => {
                    const titleSpan = e.currentTarget.querySelector(
                      ".link-title",
                    ) as HTMLElement;
                    if (titleSpan) titleSpan.style.color = link.theme.main;
                  }}
                >
                  {/* 링크 제목: 초기 색상을 link.theme.main으로 설정 */}
                  <span
                    className="link-title text-sm font-black uppercase tracking-tight transition-colors"
                    style={{ color: link.theme.main }}
                  >
                    {link.title}
                  </span>

                  {/* 링크 설명 */}
                  <span className="text-[10px] text-white font-bold transition-opacity group-hover:opacity-70">
                    {link.description}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {/* end of nav */}
      </div>
    </header>
  );
};
