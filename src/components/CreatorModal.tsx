// src/components/CreatorModal.tsx
"use client";

interface CreatorMapLink {
  datetime: string;
  link: string;
  category: string;
  description: string;
}

interface CreatorData {
  category: string;
  creator: string;
  description?: string;
  maps: CreatorMapLink[];
}

interface CreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  creatorInfo: CreatorData | null;
}

export const CreatorModal = ({
  isOpen,
  onClose,
  creatorInfo,
}: CreatorModalProps) => {
  if (!isOpen || !creatorInfo) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#1a1a1a] border-2 border-brand w-full max-w-lg rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header 영역 */}
        <div className="bg-brand p-6 text-black shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black bg-black/20 px-2 py-0.5 rounded uppercase tracking-widest">
                  {creatorInfo.category}
                </span>
                <span className="text-[10px] font-black opacity-70 uppercase tracking-widest">
                  Workshop Creator
                </span>
              </div>
              <h2 className="text-4xl font-black tracking-tighter leading-none">
                {creatorInfo.creator}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-2xl font-bold hover:scale-110 transition-transform p-1"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content 영역 (스크롤 가능) */}
        <div className="p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar bg-background">
          {/* 제작자 설명 */}
          {creatorInfo.description && (
            <div className="flex flex-col gap-2">
              <p className="text-[10px] text-brand font-black uppercase tracking-widest">
                About Creator
              </p>
              <div className="text-sm text-white/90 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
                {creatorInfo.description}
              </div>
            </div>
          )}

          {/* 관련 링크 / 맵 리스트 */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] text-brand font-black uppercase tracking-widest flex justify-between">
              <span>Reference Links & Maps</span>
              <span className="text-white/40">
                {creatorInfo.maps?.length || 0} items
              </span>
            </p>

            <div className="flex flex-col gap-3">
              {creatorInfo.maps && creatorInfo.maps.length > 0 ? (
                creatorInfo.maps.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-brand/10 hover:border-brand/50 transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-black text-cyan uppercase tracking-tighter">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-white/30 font-medium">
                        {item.datetime ? item.datetime.split(" ")[0] : ""}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-white group-hover:text-brand transition-colors mb-1">
                      {item.description}
                    </p>
                    <div className="text-[9px] text-white/20 truncate font-mono">
                      {item.link}
                    </div>
                  </a>
                ))
              ) : (
                <div className="text-center py-10 text-white/20 text-xs font-bold border-2 border-dashed border-white/5 rounded-xl">
                  등록된 상세 링크가 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer 영역 */}
        <div className="p-4 bg-black/40 border-t border-white/5 text-center shrink-0">
          <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest">
            Click outside or ✕ to close
          </p>
        </div>
      </div>
    </div>
  );
};
