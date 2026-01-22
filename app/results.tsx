import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, ChevronRight, Star } from "lucide-react-native";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addFavorite, getFavorites, removeFavorite } from "../utils/storage";

// 1. 데이터 (요금 정보 없음)
const allRoutes = [
  {
    id: "1",
    type: "fastest",
    label: "최단 시간",
    totalTime: 25,
    walkingTime: 12,
    transferCount: 1,
    congestion: "high",
    segments: [
      { line: "2호선", color: "#3CB44A", name: "건대입구" },
      { line: "환승", color: "#9CA3AF", name: "잠실" },
      { line: "8호선", color: "#E6186C", name: "석촌" },
    ],
  },
  {
    id: "2",
    type: "comfort",
    label: "덜 붐빔",
    totalTime: 38,
    walkingTime: 10,
    transferCount: 1,
    congestion: "low",
    segments: [
      { line: "7호선", color: "#747F00", name: "건대입구" },
      { line: "환승", color: "#9CA3AF", name: "강남구청" },
      { line: "수인분당", color: "#F5A200", name: "선릉" },
    ],
  },
  {
    id: "3",
    type: "min_walk",
    label: "최소 도보",
    totalTime: 42,
    walkingTime: 2,
    transferCount: 0,
    congestion: "medium",
    segments: [
      { line: "7호선", color: "#747F00", name: "건대입구" },
      { line: "7호선", color: "#747F00", name: "강남구청" },
    ],
  },
];

export default function RouteResults() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const fromStation = String(params.from || "건대입구");
  const toStation = String(params.to || "강남");
  const favoriteId = `search:${fromStation}:${toStation}`;

  const primaryRoute = useMemo(() => {
    const fastest = allRoutes.find((route) => route.type === "fastest");
    return fastest || allRoutes[0];
  }, []);

  // 메인 태그 스타일 함수
  const getTagStyle = (type: string) => {
    switch (type) {
      case "fastest":
        return { bg: "#FEE2E2", text: "#B91C1C", label: "⚡️ 최단 시간" };
      case "min_walk":
        return { bg: "#DCFCE7", text: "#15803D", label: "🚶 최소 도보" };
      case "comfort":
        return { bg: "#EFF6FF", text: "#2563EB", label: "😌 덜 붐빔" };
      default:
        return { bg: "#F3F4F6", text: "#374151", label: "추천" };
    }
  };

  // ✅ [수정 1] 혼잡도 뱃지 스타일 함수 (테두리/배경 복구!)
  const getCongestionStyle = (level: string) => {
    switch (level) {
      case "low":
        return {
          bg: "#EFF6FF",
          border: "#BFDBFE",
          text: "#2563EB",
          label: "여유 😌",
        };
      case "medium":
        return {
          bg: "#FFFBEB",
          border: "#FDE68A",
          text: "#D97706",
          label: "보통 😐",
        };
      case "high":
        return {
          bg: "#FEF2F2",
          border: "#FECACA",
          text: "#DC2626",
          label: "혼잡 😫",
        };
      default:
        return {
          bg: "#F3F4F6",
          border: "#E5E7EB",
          text: "#374151",
          label: "-",
        };
    }
  };

  const checkFavoriteStatus = async () => {
    try {
      const favorites = await getFavorites();
      const exists = favorites.find((r: any) => r.id === favoriteId);
      setIsFavorite(!!exists);
    } catch (e) {
      console.log("즐겨찾기 확인 에러:", e);
    }
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFavorite(favoriteId);
        setIsFavorite(false);
        Alert.alert("삭제됨", "즐겨찾기에서 삭제되었습니다.");
      } else {
        const newRoute = {
          id: favoriteId,
          name: `${fromStation} → ${toStation}`,
          from: fromStation,
          to: toStation,
          time: primaryRoute?.totalTime || 25,
          congestion: primaryRoute?.congestion || "medium",
        };
        await addFavorite(newRoute);
        setIsFavorite(true);
        Alert.alert("저장됨", "즐겨찾는 경로에 추가가 완료되었습니다.");
      }
    } catch (e) {
      console.log("즐겨찾기 저장 에러:", e);
    }
  };

  useEffect(() => {
    checkFavoriteStatus();
  }, [favoriteId]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <View style={styles.routeInfo}>
          <View style={styles.routeTextRow}>
            <Text style={styles.stationText}>{fromStation}</Text>
            <ArrowLeft
              size={16}
              color="#9CA3AF"
              style={{ transform: [{ rotate: "180deg" }], marginHorizontal: 8 }}
            />
            <Text style={styles.stationText}>{toStation}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={toggleFavorite} style={styles.starButton}>
          <Star
            size={24}
            color={isFavorite ? "#F59E0B" : "#D1D5DB"}
            fill={isFavorite ? "#F59E0B" : "transparent"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {allRoutes.map((route) => {
          const tag = getTagStyle(route.type);
          const congestion = getCongestionStyle(route.congestion);
          const isComfort = route.type === "comfort";

          return (
            <TouchableOpacity
              key={route.id}
              activeOpacity={0.9}
              onPress={() => router.push(`/detail/${route.id}`)}
              // ✅ [수정 2] isComfort일 때 배경색 변경 없이 테두리만 적용
              style={[styles.card, isComfort && styles.comfortCardBorder]}
            >
              {/* 1. 상단 태그 영역 */}
              <View style={styles.cardTop}>
                {/* 왼쪽: 경로 타입 */}
                <View style={[styles.typeBadge, { backgroundColor: tag.bg }]}>
                  <Text style={[styles.typeBadgeText, { color: tag.text }]}>
                    {tag.label}
                  </Text>
                </View>

                {/* 오른쪽: 혼잡도 뱃지 (복구됨!) */}
                <View
                  style={[
                    styles.congestionBadge,
                    {
                      backgroundColor: congestion.bg,
                      borderColor: congestion.border,
                    },
                  ]}
                >
                  <Text
                    style={[styles.congestionText, { color: congestion.text }]}
                  >
                    {congestion.label}
                  </Text>
                </View>
              </View>

              {/* 2. 시간 및 도착 예정 */}
              <View style={styles.mainInfo}>
                <Text style={styles.totalTime}>
                  {route.totalTime}
                  <Text style={styles.timeUnit}>분</Text>
                </Text>
                <Text style={styles.arrivalTime}>오후 2:35 도착</Text>
              </View>

              {/* 3. 시각화 바 */}
              <View style={styles.visualBarContainer}>
                {route.segments.map((seg, idx) => (
                  <React.Fragment key={idx}>
                    <View
                      style={[
                        styles.visualSegment,
                        {
                          backgroundColor: seg.color,
                          flex: seg.line === "환승" ? 0.2 : 1,
                        },
                      ]}
                    />
                    {idx < route.segments.length - 1 && (
                      <View style={styles.visualGap} />
                    )}
                  </React.Fragment>
                ))}
              </View>

              {/* 경로 텍스트 */}
              <View style={styles.pathTextContainer}>
                {route.segments.map((seg, idx) => (
                  <React.Fragment key={idx}>
                    <Text style={[styles.pathText, { color: seg.color }]}>
                      {seg.line}
                    </Text>
                    {idx < route.segments.length - 1 && (
                      <ChevronRight size={12} color="#D1D5DB" />
                    )}
                  </React.Fragment>
                ))}
              </View>

              <View style={styles.divider} />

              {/* 4. 하단 정보 (도보/환승) */}
              <View style={styles.cardFooter}>
                <View style={styles.footerItem}>
                  <Text style={styles.footerLabel}>도보</Text>
                  <Text style={styles.footerValue}>{route.walkingTime}분</Text>
                </View>
                <View style={styles.footerDivider} />
                <View style={styles.footerItem}>
                  <Text style={styles.footerLabel}>환승</Text>
                  <Text
                    style={[
                      styles.footerValue,
                      route.transferCount === 0 && { color: "#2563EB" },
                    ]}
                  >
                    {route.transferCount}회
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backButton: { padding: 8, marginRight: 8 },
  routeInfo: { flex: 1 },
  routeTextRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  starButton: { padding: 8 },
  stationText: { fontSize: 18, fontWeight: "700", color: "#111827" },

  content: { flex: 1, padding: 16 },

  // 기본 카드 스타일 (배경 흰색 고정)
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  // ✅ [수정 2 결과] 배경색 변경 없이 테두리만 파란색으로!
  comfortCardBorder: { borderColor: "#BFDBFE", borderWidth: 2 },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  typeBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  typeBadgeText: { fontSize: 12, fontWeight: "700" },

  // ✅ [수정 1 결과] 혼잡도 뱃지 스타일 복구 (테두리 추가)
  congestionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  congestionText: { fontSize: 12, fontWeight: "700" },

  mainInfo: { marginBottom: 12 },
  totalTime: { fontSize: 26, fontWeight: "800", color: "#111827" },
  timeUnit: { fontSize: 16, fontWeight: "600", color: "#374151" },
  arrivalTime: { fontSize: 13, color: "#6B7280", marginTop: 2 },

  visualBarContainer: {
    flexDirection: "row",
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
    backgroundColor: "#E5E7EB",
  },
  visualSegment: { height: "100%" },
  visualGap: { width: 2, backgroundColor: "white" },

  pathTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 16,
  },
  pathText: { fontSize: 12, fontWeight: "700" },

  divider: { height: 1, backgroundColor: "#F3F4F6", marginBottom: 16 },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  footerItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  footerLabel: { fontSize: 13, color: "#9CA3AF", marginRight: 4 },
  footerValue: { fontSize: 14, fontWeight: "600", color: "#374151" },
  footerDivider: {
    width: 1,
    height: 12,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 16,
  },
});
