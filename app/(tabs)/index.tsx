/**
 * 홈 화면
 */
import { useFocusEffect, useRouter } from "expo-router"; // 💡 useFocusEffect 추가
import {
  Bell,
  ChevronRight,
  Navigation,
  Search,
  Star,
} from "lucide-react-native";
import { useCallback, useState } from "react"; // 💡 useState, useCallback 추가
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 💡 저장소 함수 가져오기 (경로가 다르다면 수정 필요)
import { getFavorites } from "../../utils/storage";

// 혼잡도 뱃지 컴포넌트 (그대로 유지)
const CongestionBadge = ({ level }: { level: string }) => {
  let bg = "#F3F4F6";
  let text = "#4B5563";
  let label = "보통";

  if (level === "low") {
    bg = "#DCFCE7";
    text = "#15803D";
    label = "여유 😌";
  } else if (level === "medium") {
    bg = "#FEF9C3";
    text = "#A16207";
    label = "보통 😐";
  } else if (level === "high") {
    bg = "#FEE2E2";
    text = "#B91C1C";
    label = "혼잡 😫";
  }

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.badgeText, { color: text }]}>{label}</Text>
    </View>
  );
};

export default function Home() {
  const router = useRouter();

  // 💡 [변경] 가짜 데이터 대신 실제 데이터를 담을 상태(State) 생성
  const [favorites, setFavorites] = useState<any[]>([]);

  // 💡 [핵심] 화면이 포커스될 때마다(다른 탭 갔다 왔을 때) 실행됨
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const data = await getFavorites();
          setFavorites(data || []); // 데이터가 없으면 빈 배열
        } catch (e) {
          console.error("즐겨찾기 로드 실패:", e);
        }
      };
      loadData();
    }, []),
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* 1. 히어로 섹션 (검색창 등 - 그대로 유지) */}
      <View style={styles.heroSection}>
        <SafeAreaView edges={["top"]}>
          <View style={styles.topBar}>
            <View style={styles.logoContainer}>
              <View style={styles.logoIcon}>
                <Navigation size={20} color="white" fill="white" />
              </View>
              <Text style={styles.logoText}>안끼길</Text>
            </View>
            <TouchableOpacity style={styles.bellButton}>
              <Bell size={24} color="#1F2937" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>

          <View style={styles.greetingContainer}>
            <Text style={styles.greetingSub}>오늘도 쾌적한 이동!</Text>
            <Text style={styles.greetingMain}>어디로 떠나시나요?</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push("/search")}
            style={styles.bigSearchBar}
          >
            <Search size={28} color="#2563EB" />
            <View style={styles.searchTextContainer}>
              <Text style={styles.searchPlaceholder}>역 이름 검색</Text>
              <Text style={styles.searchSubPlaceholder}>
                출발역 또는 도착역 입력
              </Text>
            </View>
            <View style={styles.searchButtonCircle}>
              <ChevronRight size={24} color="white" />
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 2. 즐겨찾기 섹션 */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Star size={20} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.sectionTitle}>즐겨찾는 경로</Text>
          </View>
          {/* 전체보기 버튼은 나중에 기능 구현 필요 */}
          <TouchableOpacity onPress={() => router.push("/favorites" as any)}>
            <Text style={styles.viewAll}>전체보기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardList}>
          {/* 💡 [변경] 즐겨찾기 데이터 유무에 따라 화면 다르게 표시 */}
          {favorites.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                즐겨찾는 경로가 없습니다 텅..
              </Text>
            </View>
          ) : (
            favorites.map((route, index) => (
              <TouchableOpacity
                key={route.id || index}
                activeOpacity={0.8}
                onPress={() =>
                  // 클릭 시 검색 결과 화면으로 이동하며 파라미터 전달
                  router.push({
                    pathname: "/results",
                    // 💡 저장된 데이터 키값에 맞춰 수정하세요 (depStation vs from)
                    params: {
                      from: route.depStation || route.from,
                      to: route.arrStation || route.to,
                    },
                  })
                }
                style={styles.card}
              >
                {/* 카드 상단 */}
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.routeName}>
                      {route.name || "저장된 경로"}
                    </Text>
                    <View style={styles.routeRow}>
                      {/* 💡 데이터 필드명 매핑 (depStation이 없으면 from 사용) */}
                      <Text style={styles.routeStation}>
                        {route.depStation || route.from}
                      </Text>
                      <ChevronRight size={14} color="#9CA3AF" />
                      <Text style={styles.routeStation}>
                        {route.arrStation || route.to}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}

          {/* 추가 버튼 */}
          <TouchableOpacity
            onPress={() => router.push("/search")}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>+ 새 경로 추가하기</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },

  // 히어로 섹션
  heroSection: {
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingBottom: 40,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 10,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 24,
  },
  logoContainer: { flexDirection: "row", alignItems: "center", gap: 8 },
  logoIcon: { backgroundColor: "#2563EB", padding: 6, borderRadius: 8 },
  logoText: { fontSize: 20, fontWeight: "800", color: "#111827" },
  bellButton: { padding: 8, backgroundColor: "#F3F4F6", borderRadius: 999 },
  notificationDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    backgroundColor: "#EF4444",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },

  greetingContainer: { marginBottom: 24 },
  greetingSub: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
    marginBottom: 4,
  },
  greetingMain: { fontSize: 28, color: "#111827", fontWeight: "800" },

  // 검색창
  bigSearchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 24,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#EFF6FF",
  },
  searchTextContainer: { flex: 1, marginLeft: 16 },
  searchPlaceholder: { fontSize: 18, fontWeight: "700", color: "#1F2937" },
  searchSubPlaceholder: { fontSize: 13, color: "#9CA3AF", marginTop: 2 },
  searchButtonCircle: {
    backgroundColor: "#2563EB",
    padding: 10,
    borderRadius: 99,
  },

  // 컨텐츠 영역
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 32 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  sectionTitle: { fontSize: 20, fontWeight: "700", color: "#111827" },
  viewAll: { fontSize: 14, fontWeight: "600", color: "#2563EB" },
  cardList: { gap: 16 },

  // 💡 [추가] 빈 상태 스타일
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 10,
  },
  emptyText: {
    color: "#9CA3AF",
    fontSize: 14,
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  routeName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  routeRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  routeStation: { fontSize: 14, fontWeight: "500", color: "#6B7280" },
  divider: {
    height: 1,
    backgroundColor: "#F9FAFB",
    width: "100%",
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  timeTagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1D4ED8",
    marginLeft: 4,
  },
  durationText: { fontSize: 20, fontWeight: "700", color: "#111827" },
  durationHighlight: { color: "#2563EB" },
  badge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
  badgeText: { fontSize: 12, fontWeight: "700" },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    borderStyle: "dashed",
    backgroundColor: "rgba(249, 250, 251, 0.5)",
  },
  addButtonText: { color: "#9CA3AF", fontWeight: "600", fontSize: 15 },
});
