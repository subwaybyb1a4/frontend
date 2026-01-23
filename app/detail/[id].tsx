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

// 🎨 노선별 공식 색상 정의 (1호선 ~ 9호선)
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

  // 사용자가 검색한 실제 역 이름 연동
  const fromName = String(params.from || "출발역");
  const toName = String(params.to || "도착역");

  const [routeData, setRouteData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        // 백엔드 명세서 구조 반영 가짜 데이터
        const mockResponse = {
          total_time: params.totalTime || 27,
          transfer_count: 1,
          summary:
            "영등포구청역 환승 시 2-3번 문을 이용하면 이동 거리가 가장 짧아요! 🤖",
          segments: [
            { type: "subway", label: "5호선", station: fromName, minutes: 12 },
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
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [params.id, fromName, toName]);

  if (loading || !routeData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  const firstSubway = routeData.segments[0];
  const transfer = routeData.segments.find((s: any) => s.type === "transfer");
  const secondSubway = routeData.segments[2];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* 헤더: 실제 역 이름 반영 */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={26} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {fromName} → {toName}
        </Text>
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
            {fromName} → {toName}
          </Text>
        </View>

        {/* 🗺 여백이 보강된 타임라인 카드 */}
        <View style={styles.mainRouteCard}>
          {/* 1. 출발지점 (승차) */}
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
                <Text style={styles.mainStationName}>{fromName}</Text>
                <Text style={styles.lineSubText}>{firstSubway.label}</Text>
              </View>
              <Text style={styles.moveDetail}>
                {firstSubway.minutes}분 이동
              </Text>
            </View>
          </View>

          {/* 2. 환승 하차 지점 */}
          <View style={styles.node}>
            <View style={styles.nodeLeft}>
              <View
                style={[
                  styles.smallCircle,
                  { borderColor: getLineColor(firstSubway.label) },
                ]}
              />
              <View style={styles.smoothDottedLine} />
            </View>
            <View style={styles.nodeRight}>
              <Text style={styles.subStationName}>{transfer.station}</Text>
              <Text style={styles.infoText}>내리는 문 오른쪽</Text>
            </View>
          </View>

          {/* 💡 3. 환승 도보 이동 (여백 보강 지점) */}
          <View style={[styles.node, { minHeight: 90 }]}>
            <View style={styles.nodeLeft}>
              <Footprints
                size={20}
                color="#9CA3AF"
                style={{ marginVertical: 10 }}
              />
              {/* 점선 하단에 margin을 주어 다음 역과 떨어뜨림 */}
              <View style={[styles.smoothDottedLine, { marginBottom: 15 }]} />
            </View>
            <View style={styles.nodeRight}>
              <View style={styles.walkInfoBox}>
                <Text style={styles.walkText}>
                  환승 도보 이동 {transfer.minutes}분
                </Text>
              </View>
            </View>
          </View>

          {/* 4. 환승 승차 지점: 이전 점선과 떨어져서 시작됨 */}
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

          {/* 5. 최종 목적지 도착 */}
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
              <Text style={styles.mainStationName}>{toName}</Text>
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
            <Text style={styles.llmTitle}>AI의 쾌적 꿀팁</Text>
            <Text style={styles.llmText}>{routeData.summary}</Text>
          </View>
        </View>
      </ScrollView>

      {/* 하단 버튼 */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.startButton}
          // 1. onPress를 추가합니다.
          onPress={() =>
            router.push({
              // 2. 목적지는 tracking 폴더의 [id].tsx 화면입니다.
              pathname: "/tracking/[id]",
              // 3. 실제 역 이름을 바구니(params)에 담아서 보냅니다.
              params: {
                id: String(params.id),
                from: fromName,
                to: toName,
              },
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    flex: 1,
    textAlign: "center",
  },
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

  mainRouteCard: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 28,
    marginBottom: 16,
  },
  node: { flexDirection: "row", minHeight: 70 },
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
  verticalLine: { width: 4, flex: 1, marginVertical: -5 },

  smoothDottedLine: {
    width: 2,
    flex: 1,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#D1D5DB",
    borderRadius: 1,
    marginVertical: -2,
    opacity: 0.6,
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
