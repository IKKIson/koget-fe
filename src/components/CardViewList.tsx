// src/components/CardViewList.tsx

"use client";

import { useEffect, useState, useMemo } from "react";
import { CardView } from "./CardView";
import { CARD_LIST_CONFIG } from "@/data/cardviewlist";

interface MapData {
  category: string;
  creator: string;
  map_name: string;
  code: string;
  [key: string]: any;
}

interface CardViewListProps {
  searchTerm?: string;
  onCountChange?: (count: number) => void;
}

export const CardViewList = ({
  searchTerm,
  onCountChange,
}: CardViewListProps) => {
  const [maps, setMaps] = useState<MapData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(CARD_LIST_CONFIG.JSON_PATHS.CODES);
        if (!response.ok) throw new Error(CARD_LIST_CONFIG.MESSAGES.ERROR);
        const data = await response.json();
        setMaps(data.maps || []);
      } catch (err) {
        setError(CARD_LIST_CONFIG.MESSAGES.ERROR);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // useMemo를 사용하여 searchTerm이나 maps가 바뀔 때만 필터링을 다시 계산합니다.
  const filteredMaps = useMemo(() => {
    const safeSearch = (searchTerm || "").toLowerCase().trim();
    if (!safeSearch) return maps;

    return maps.filter((map) => {
      const creator = (map.creator || "").toLowerCase();
      const mapName = (map.map_name || "").toLowerCase();
      const code = (map.code || "").toLowerCase();
      const category = (map.category || "").toLowerCase();

      return (
        creator.includes(safeSearch) ||
        mapName.includes(safeSearch) ||
        code.includes(safeSearch) ||
        category.includes(safeSearch)
      );
    });
  }, [searchTerm, maps]);

  // filteredMaps.length가 변할 때마다 부모
  // 에게 알림
  useEffect(() => {
    if (onCountChange) {
      onCountChange(filteredMaps.length);
    }
  }, [filteredMaps.length, onCountChange]);

  if (loading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-white font-bold">
        {CARD_LIST_CONFIG.MESSAGES.LOADING}
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-danger font-bold">
        {error}
      </div>
    );
  }

  if (maps.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-dark-blue font-bold">
        {CARD_LIST_CONFIG.MESSAGES.EMPTY}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
      {filteredMaps.map((map) => (
        <CardView key={map.code} {...map} />
      ))}
    </div>
  );
};
