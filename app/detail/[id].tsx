import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Footprints } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 🎨 노선별 공식 색상 정의
const getLineColor = (line: string) => {
  if (line.includes("1호선")) return "#0052A4";
  if (line.includes("2호선")) return "#3CB44A";
  if (line.includes("3호선")) return "#EF7C1C";
  if (line.includes("4호선")) return "#00A5DE";
  if (line.includes("5호선")) return "#996CAC";
  if (line.includes("6호선")) return "#CD7C2F";
  if (line.includes("7호선")) return "#747F00";
  if (line.includes("8호선")) return "#E6186C";
  if (line.includes("9호선")) return "#BDB092";
  if (line.includes("수인분당")) return "#F5A200";
  return "#9CA3AF";
};

export default function RouteDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const from = String(params.from || "출발역");
  const to = String(params.to || "도착역");

  const [routeData, setRouteData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        // 백엔드 명세서 구조 시뮬레이션
        const mockResponse = {
          total_time: params.totalTime || 27,
          transfer_count: 1,
          summary:
            "영등포구청역 환승 시 2-3번 문을 이용하면 이동 거리가 가장 짧아요! 🤖",
          segments: [
            { type: "subway", label: "5호선", station: from, minutes: 12 },
            {
              type: "transfer",
              label: "환승",
              station: "영등포구청",
              minutes: 3,
            },
            {
              type: "subway",
              label: "2호선",
              station: "영등포구청",
              minutes: 9,
            },
          ],
        };
        setRouteData(mockResponse);
      } catch (e) {
        console.error("데이터 로드 실패:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [params.id, from, to]);

  if (loading || !routeData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  // 데이터 추출
  const firstSubway = routeData.segments[0];
  const transfer = routeData.segments.find((s: any) => s.type === "transfer");
  const secondSubway = routeData.segments[2];

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
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* 요약 카드 */}
        <View style={styles.miniSummary}>
          <View style={styles.summaryRow}>
            <Text style={styles.highlightTime}>
              {routeData.total_time}분 소요
            </Text>
            <View style={styles.transferBadge}>
              <Text style={styles.transferBadgeText}>
                환승 {routeData.transfer_count}회
              </Text>
            </View>
          </View>
          <Text style={styles.stationTitle}>
            {from} → {to}
          </Text>
        </View>

        {/* 🗺 실시간 경로 맵 (IMG_1517 스타일 반영) */}
        <View style={styles.mainRouteCard}>
          {/* 1단계: 출발역 승차 */}
          <View style={styles.node}>
            <View style={styles.nodeLeft}>
              <View
                style={[
                  styles.circle,
                  { backgroundColor: getLineColor(firstSubway.label) },
                ]}
              >
                <Text style={styles.circleText}>{firstSubway.label[0]}</Text>
              </View>
              <View
                style={[
                  styles.verticalLine,
                  { backgroundColor: getLineColor(firstSubway.label) },
                ]}
              />
            </View>
            <View style={styles.nodeRight}>
              <View style={styles.stationRow}>
                <Text style={styles.mainStationName}>{from}</Text>
                <Text style={styles.lineSubText}>{firstSubway.label}</Text>
              </View>
              <Text style={styles.moveDetail}>
                {firstSubway.minutes}분 이동
              </Text>
            </View>
          </View>

          {/* 2단계: 환승역 하차 (중요!) */}
          <View style={styles.node}>
            <View style={styles.nodeLeft}>
              <View
                style={[
                  styles.smallCircle,
                  { borderColor: getLineColor(firstSubway.label) },
                ]}
              />
              <View style={styles.dottedLine} />
            </View>
            <View style={styles.nodeRight}>
              <Text style={styles.subStationName}>{transfer.station}</Text>
              <Text style={styles.infoText}>내리는 문 오른쪽</Text>
            </View>
          </View>

          {/* 3단계: 도보 이동 구간 */}
          <View style={styles.node}>
            <View style={styles.nodeLeft}>
              <Footprints
                size={20}
                color="#9CA3AF"
                style={{ marginVertical: 10 }}
              />
              <View style={styles.dottedLine} />
            </View>
            <View style={styles.nodeRight}>
              <View style={styles.walkInfoBox}>
                <Text style={styles.walkText}>
                  환승 도보 이동 {transfer.minutes}분
                </Text>
              </View>
            </View>
          </View>

          {/* 4단계: 환승역 다시 승차 */}
          <View style={styles.node}>
            <View style={styles.nodeLeft}>
              <View
                style={[
                  styles.circle,
                  { backgroundColor: getLineColor(secondSubway.label) },
                ]}
              >
                <Text style={styles.circleText}>{secondSubway.label[0]}</Text>
              </View>
              <View
                style={[
                  styles.verticalLine,
                  { backgroundColor: getLineColor(secondSubway.label) },
                ]}
              />
            </View>
            <View style={styles.nodeRight}>
              <View style={styles.stationRow}>
                <Text style={styles.mainStationName}>{transfer.station}</Text>
                <Text style={styles.lineSubText}>{secondSubway.label}</Text>
              </View>
              <Text style={styles.moveDetail}>
                {secondSubway.minutes}분 이동
              </Text>
            </View>
          </View>

          {/* 5단계: 최종 도착역 */}
          <View style={[styles.node, { minHeight: 0 }]}>
            <View style={styles.nodeLeft}>
              <View
                style={[
                  styles.circle,
                  { backgroundColor: getLineColor(secondSubway.label) },
                ]}
              >
                <Text style={styles.circleText}>{secondSubway.label[0]}</Text>
              </View>
            </View>
            <View style={styles.nodeRight}>
              <Text style={styles.mainStationName}>{to}</Text>
              <Text style={styles.infoText}>도착 완료</Text>
            </View>
          </View>
        </View>

        {/* AI 쾌적 꿀팁 */}
        <View style={styles.llmBox}>
          <View style={styles.llmIcon}>
            <Text style={{ fontSize: 20 }}>🤖</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.llmTitle}>AI의 꿀팁</Text>
            <Text style={styles.llmText}>{routeData.summary}</Text>
          </View>
        </View>
      </ScrollView>

      {/* 하단 버튼 */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => router.push(`/tracking/${params.id}`)}
        >
          <Text style={styles.startButtonText}>이 경로로 출발하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
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
    padding: 24,
    borderRadius: 24,
    marginBottom: 16,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  highlightTime: { fontSize: 28, fontWeight: "800", color: "#2563EB" },
  transferBadge: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  transferBadgeText: { color: "#2563EB", fontSize: 14, fontWeight: "700" },
  stationTitle: { fontSize: 18, color: "#4B5563", fontWeight: "600" },

  // 타임라인 스타일
  mainRouteCard: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 28,
    marginBottom: 16,
  },
  node: { flexDirection: "row", minHeight: 80 },
  nodeLeft: { width: 40, alignItems: "center" },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  circleText: { color: "white", fontWeight: "800", fontSize: 14 },
  smallCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "white",
    borderWidth: 3,
    marginVertical: 7,
  },
  verticalLine: { width: 5, flex: 1, marginVertical: -5 },
  dottedLine: {
    width: 0,
    flex: 1,
    borderStyle: "dotted",
    borderWidth: 2,
    borderColor: "#D1D5DB",
    borderRadius: 1,
  },

  nodeRight: { flex: 1, marginLeft: 16, paddingBottom: 20 },
  stationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  mainStationName: { fontSize: 22, fontWeight: "800", color: "#111827" },
  subStationName: { fontSize: 18, fontWeight: "700", color: "#374151" },
  lineSubText: { fontSize: 14, color: "#6B7280", fontWeight: "600" },
  moveDetail: { fontSize: 14, color: "#3B82F6", fontWeight: "700" },
  infoText: { fontSize: 13, color: "#9CA3AF" },
  walkInfoBox: { paddingVertical: 8 },
  walkText: { fontSize: 15, color: "#4B5563", fontWeight: "700" },

  llmBox: {
    flexDirection: "row",
    backgroundColor: "#EFF6FF",
    padding: 18,
    borderRadius: 20,
    gap: 12,
  },
  llmIcon: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  llmTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E3A8A",
    marginBottom: 4,
  },
  llmText: { fontSize: 15, color: "#1E40AF", lineHeight: 22 },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 20,
    paddingBottom: 40,
  },
  startButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
  },
  startButtonText: { color: "white", fontSize: 18, fontWeight: "700" },
});
