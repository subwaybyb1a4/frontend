import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RouteDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={26} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>상세 경로 정보</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* 요약 카드 */}
        <View style={styles.miniSummary}>
          <View style={styles.summaryRow}>
            <View
              style={{ flexDirection: "row", alignItems: "flex-end", gap: 5 }}
            >
              <Text style={styles.highlightTime}>
                {params.totalTime || 25}분
              </Text>
              <Text style={styles.summaryTimeUnit}>소요</Text>
            </View>
            <View style={styles.transferBadge}>
              <Text style={styles.transferBadgeText}>환승 1회</Text>
            </View>
          </View>
          <Text style={styles.stationTitle}>
            {params.from || "출발"} → {params.to || "도착"}
          </Text>
        </View>

        {/* 메인 경로 카드 */}
        <View style={styles.mainRouteCard}>
          {/* A. 출발역 */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineLeft}>
              <View style={[styles.donutDot, { borderColor: "#15803D" }]} />
              <View style={styles.line} />
            </View>
            <View style={styles.timelineRight}>
              <View style={styles.stationHeader}>
                <Text style={styles.stationName}>
                  {params.from || "출발역"}
                </Text>
                <Text style={[styles.lineBadge, { color: "#15803D" }]}>
                  2호선
                </Text>
              </View>

              {/* 시간표 박스 */}
              <View style={styles.trainScheduleBox}>
                <View style={styles.scheduleRow}>
                  <View style={styles.trainLabelBox}>
                    <Text style={styles.trainLabel}>이번 열차</Text>
                  </View>
                  <Text style={styles.arrivalText}>
                    16:07 <Text style={styles.arrivalSub}>(7분)</Text>
                  </Text>
                  <View
                    style={[
                      styles.congestionTag,
                      { backgroundColor: "#DCFCE7" },
                    ]}
                  >
                    <Text
                      style={[styles.congestionTagText, { color: "#15803D" }]}
                    >
                      여유 😌
                    </Text>
                  </View>
                </View>
                <View style={styles.scheduleDivider} />
                <View style={styles.scheduleRow}>
                  <View
                    style={[
                      styles.trainLabelBox,
                      { backgroundColor: "#F3F4F6" },
                    ]}
                  >
                    <Text style={[styles.trainLabel, { color: "#6B7280" }]}>
                      다음 열차
                    </Text>
                  </View>
                  <Text style={styles.arrivalText}>
                    16:16 <Text style={styles.arrivalSub}>(16분)</Text>
                  </Text>
                  <View
                    style={[
                      styles.congestionTag,
                      { backgroundColor: "#FEE2E2" },
                    ]}
                  >
                    <Text
                      style={[styles.congestionTagText, { color: "#B91C1C" }]}
                    >
                      혼잡 😫
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* B. 환승역 (예시) */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineLeft}>
              <View style={[styles.donutDot, { borderColor: "#6B7280" }]} />
              <View style={styles.line} />
            </View>
            <View style={styles.timelineRight}>
              <Text style={styles.stationName}>잠실</Text>
              <View style={styles.transferInfoBox}>
                <View style={styles.transferTag}>
                  <Text style={styles.transferTagText}>빠른 환승 9-4번 문</Text>
                </View>
                <Text style={styles.walkText}>도보 3분 이동</Text>
              </View>
              <Text style={styles.moveDetail}>⏱ 15분 (8개 역 이동)</Text>
            </View>
          </View>

          {/* C. 도착역 */}
          <View style={[styles.timelineItem, { minHeight: 0 }]}>
            <View style={styles.timelineLeft}>
              <View style={[styles.donutDot, { borderColor: "#DC2626" }]} />
            </View>
            <View style={styles.timelineRight}>
              <View style={styles.stationHeader}>
                <Text style={styles.stationName}>{params.to || "도착역"}</Text>
                <Text style={[styles.lineBadge, { color: "#DC2626" }]}>
                  8호선
                </Text>
              </View>
              <Text style={styles.endText}>
                하차 알림을 켜두시면 편해요! 🔔
              </Text>
            </View>
          </View>
        </View>

        {/* LLM 설명 칸 */}
        <View style={styles.llmBox}>
          <View style={styles.llmIcon}>
            <Text style={{ fontSize: 20 }}>🤖</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.llmTitle}>AI의 꿀팁</Text>
            <Text style={styles.llmText}>
              "이번 열차는 여유롭네요! 3번 칸에 타시면 잠실역 계단이 바로 앞이라
              환승이 가장 빨라요."
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* 하단 버튼 */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() =>
            router.push({
              pathname: "/tracking/[id]",
              params: { id: params.id, from: params.from, to: params.to },
            })
          }
        >
          <Text style={styles.startButtonText}>이 경로로 출발하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#111827" },
  content: { padding: 16 },
  miniSummary: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  highlightTime: { fontSize: 28, fontWeight: "800", color: "#2563EB" },
  summaryTimeUnit: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  transferBadge: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  transferBadgeText: { color: "#2563EB", fontSize: 14, fontWeight: "700" },
  stationTitle: { fontSize: 18, color: "#4B5563", fontWeight: "600" },
  mainRouteCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  timelineItem: { flexDirection: "row", minHeight: 115 },
  timelineLeft: { width: 32, alignItems: "center", marginRight: 16 },
  donutDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 4,
    zIndex: 2,
  },
  line: { width: 2, backgroundColor: "#E5E7EB", flex: 1, marginVertical: -4 },
  timelineRight: { flex: 1, paddingBottom: 12 },
  stationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  stationName: { fontSize: 22, fontWeight: "800", color: "#111827" },
  lineBadge: { fontSize: 16, fontWeight: "700" },
  trainScheduleBox: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  scheduleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  trainLabelBox: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 5,
  },
  trainLabel: { fontSize: 13, fontWeight: "700", color: "#15803D" },
  arrivalText: { fontSize: 17, fontWeight: "600", color: "#1F2937" },
  arrivalSub: { fontSize: 15, color: "#6B7280" },
  congestionTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  congestionTagText: { fontSize: 13, fontWeight: "700" },
  scheduleDivider: { height: 1, backgroundColor: "#E5E7EB", marginVertical: 6 },
  transferInfoBox: { marginBottom: 6 },
  transferTag: {
    backgroundColor: "#FFF7ED",
    alignSelf: "flex-start",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 6,
    marginBottom: 5,
  },
  transferTagText: { color: "#D97706", fontWeight: "700", fontSize: 14 },
  walkText: { color: "#92400E", fontSize: 14 },
  moveDetail: { color: "#9CA3AF", fontSize: 15, marginTop: 3 },
  endText: { color: "#6B7280", fontSize: 15, marginTop: 5 },
  llmBox: {
    flexDirection: "row",
    backgroundColor: "#EFF6FF",
    padding: 16,
    borderRadius: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  llmIcon: {
    width: 38,
    height: 38,
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  llmTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E3A8A",
    marginBottom: 4,
  },
  llmText: { fontSize: 16, color: "#1E40AF", lineHeight: 22 },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 20,
    paddingBottom: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  startButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
  },
  startButtonText: { color: "white", fontSize: 20, fontWeight: "700" },
});
