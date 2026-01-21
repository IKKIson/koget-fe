// src/components/Footer.tsx
import { COMMUNITY_LINKS } from "../data/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-gray shrink-0 mt-auto">
      <div className="max-w-[1440px] mx-auto h-[72px] px-8 flex items-center justify-between">
        {/* 좌측 저작권 및 정보 영역 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-brand font-black text-lg tracking-tighter">
              KoGet!
            </span>
            <span className="text-dark-blue text-[10px] font-bold uppercase tracking-widest">
              Workshop Archive
            </span>
          </div>
          <p className="text-[10px] text-white/40 font-medium">
            © {currentYear} KoGet!. All rights reserved. Designed and Developed
            by{" "}
            <a
              href="https://ikkison.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand transition-colors font-bold"
            >
              IKKIson
            </a>
          </p>
        </div>

        {/* 우측 퀵 링크 영역 (헤더보다 간결하게) */}
        <nav>
          <ul className="flex items-center gap-6">
            {COMMUNITY_LINKS.map((link) => (
              <li key={`footer-${link.href}`}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-black text-dark-blue hover:text-white transition-colors uppercase tracking-widest"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};
